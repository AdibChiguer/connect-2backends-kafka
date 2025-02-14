# Use OpenJDK as base
FROM openjdk:17

# Set working directory
WORKDIR /app

# Copy JAR file
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]