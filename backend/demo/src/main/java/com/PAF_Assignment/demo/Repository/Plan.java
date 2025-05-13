@Document(collection = "plan")
public class Plan {
    @Id
    private String id;
    private String rname;
    private String ingredients;
    private String category;
    // Getters & Setters if not using Lombok
}
