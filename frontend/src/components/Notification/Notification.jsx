 // Components/Notification/Notification.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getNotificationsAction, 
    markNotificationAsReadAction, 
    deleteNotificationAction,
    clearNotificationError
} from "../../Redux/Notification/Action";
import { timeDifference } from "../../Config/Logic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

const Notification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notification } = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [readNotifications, setReadNotifications] = useState(new Set());
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [justMarkedAsRead, setJustMarkedAsRead] = useState(null);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const modalElement = document.getElementById('markAsReadModal');
        const bootstrapModal = new Modal(modalElement);
        setModal(bootstrapModal);
    }, []);

    useEffect(() => {
        dispatch(getNotificationsAction(token));
    }, [token, dispatch]);

    useEffect(() => {
        const readIds = new Set(
            notification.notifications
                .filter(item => item.isRead)
                .map(item => item.id)
        );
        setReadNotifications(readIds);
    }, [notification.notifications]);

    useEffect(() => {
        if (justMarkedAsRead) {
            const timer = setTimeout(() => {
                setJustMarkedAsRead(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [justMarkedAsRead]);

    useEffect(() => {
        if (notification.error) {
            toast.error(notification.error);
            dispatch(clearNotificationError());
        }
    }, [notification.error, dispatch]);

    const openMarkAsReadModal = (notification) => {
        setSelectedNotification(notification);
        modal?.show();
    };

    const handleMarkAsRead = async (notification) => {
        try {
            setLoading(true);
            await dispatch(markNotificationAsReadAction(notification.id));
            setReadNotifications(prev => new Set([...prev, notification.id]));
            setJustMarkedAsRead(notification.id);
            toast.success("Notification marked as read");
        } catch (error) {
            toast.error("Failed to mark notification as read");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            setLoading(true);
            await dispatch(deleteNotificationAction(notificationId));
            toast.success("Notification deleted successfully");
        } catch (error) {
            toast.error("Failed to delete notification");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToPost = (postId) => {
        if (postId) {
            navigate(`/p/${postId}`);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'LIKE':
                return (
                    <div className="rounded-full bg-gradient-to-br from-red-100 to-red-50 p-3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'COMMENT':
                return (
                    <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 p-3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-50 p-3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                );
        }
    };

    const filterNotifications = () => {
        let filteredNotifications = [...notification.notifications];
        switch (activeTab) {
            case 'unread':
                return filteredNotifications.filter(item => !readNotifications.has(item.id));
            case 'read':
                return filteredNotifications.filter(item => readNotifications.has(item.id));
            default:
                return filteredNotifications;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-700/50">
                    <div className="px-8 py-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/70 to-gray-900/70">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
                                Notifications
                            </h2>
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-700/50 text-gray-300">
                                {filterNotifications().length} items
                            </span>
                        </div>
                    </div>
                    
                    <div className="border-b border-gray-700/50 bg-gray-800/30">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`relative py-5 px-8 text-center font-medium text-sm transition-all duration-300 group ${
                                    activeTab === 'all'
                                        ? 'text-sky-400'
                                        : 'text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                All
                                {activeTab === 'all' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full"></span>
                                )}
                                <span className="absolute inset-x-1/2 -bottom-px h-px w-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => setActiveTab('unread')}
                                className={`relative py-5 px-8 text-center font-medium text-sm transition-all duration-300 group ${
                                    activeTab === 'unread'
                                        ? 'text-sky-400'
                                        : 'text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                Unread
                                {activeTab === 'unread' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full"></span>
                                )}
                                <span className="absolute inset-x-1/2 -bottom-px h-px w-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => setActiveTab('read')}
                                className={`relative py-5 px-8 text-center font-medium text-sm transition-all duration-300 group ${
                                    activeTab === 'read'
                                        ? 'text-sky-400'
                                        : 'text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                Read
                                {activeTab === 'read' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full"></span>
                                )}
                                <span className="absolute inset-x-1/2 -bottom-px h-px w-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </nav>
                    </div>

                    <div className="divide-y divide-gray-700/30">
                        {filterNotifications().length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="mx-auto h-24 w-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 border border-gray-700/50">
                                    <svg className="h-12 w-12 text-gray-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-300">No notifications yet</h3>
                                <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
                                    Your notifications will appear here when you receive likes, comments, or other interactions.
                                </p>
                            </div>
                        ) : (
                            filterNotifications().map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-5 transition-all duration-300 ${
                                        !readNotifications.has(item.id)
                                            ? 'bg-gradient-to-r from-gray-800/70 to-gray-900/70 border-l-4 border-sky-500'
                                            : justMarkedAsRead === item.id
                                            ? 'bg-gray-800/30 border-l-4 border-gray-600'
                                            : 'bg-gray-800/20'
                                    } hover:bg-gray-800/40 hover:shadow-sm`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(item.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <img
                                                        className="h-10 w-10 rounded-full border-2 border-gray-600/50 object-cover flex-shrink-0"
                                                        src={item.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-200 leading-snug">
                                                            <span className="font-bold text-gray-100">{item.user.username}</span>
                                                            {" "}{item.message}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400/80">
                                                            {timeDifference(item.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 justify-end">
                                                    {!readNotifications.has(item.id) && (
                                                        <button
                                                            onClick={() => openMarkAsReadModal(item)}
                                                            disabled={loading}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-br from-sky-600 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        disabled={loading}
                                                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border border-gray-600/50 hover:border-gray-500/70 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                                                    >
                                                        Delete
                                                    </button>
                                                    {item.postId && (
                                                        <button
                                                            onClick={() => handleNavigateToPost(item.postId)}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                        >
                                                            View Post
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Mark as Read Confirmation Modal */}
            <div className="modal fade" id="markAsReadModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl overflow-hidden">
                        <div className="modal-header border-b border-gray-700/50 px-6 py-4">
                            <h5 className="modal-title text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
                                Confirm Action
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close btn-close-white" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body px-6 py-5">
                            <p className="text-gray-300 mb-4">Are you sure you want to mark this notification as read?</p>
                            {selectedNotification && (
                                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                    <div className="flex items-center gap-3">
                                        <img
                                            className="rounded-full h-10 w-10 border-2 border-gray-600/50 object-cover"
                                            src={selectedNotification.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt=""
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-200">
                                                <span className="font-bold text-gray-100">{selectedNotification.user.username}</span>
                                                {" "}{selectedNotification.message}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {timeDifference(selectedNotification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer border-t border-gray-700/50 px-6 py-4">
                            <button 
                                type="button" 
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:border-gray-500/70 hover:bg-gray-700/70 transition-all duration-200"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                onClick={() => handleMarkAsRead(selectedNotification)}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;