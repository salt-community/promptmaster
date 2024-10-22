# first just build the jar with maven
FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# then copy the built jar into a new container and just run it
FROM amazoncorretto:21.0.3-alpine3.19
COPY --from=build /app/target/promptmaster*.jar promptmaster.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","promptmaster.jar"]
