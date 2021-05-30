$(document).ready(() => {

    // Hide the fields for user registration
    $(".name-group").hide();
    $(".dob-group").hide();
    $(".city-group").hide();
    $(".gender-group").hide();
    $(".hobby-group").hide();
    $(".state-group").hide();
    $(".prof-group").hide();
    $(".salary-group").hide();
    $(".favourite-group").hide();
    $(".errors").hide();



    // If the user wants to register reveals the fields to input
    $("#reg").click((event) => {
        $(".name-group").show("slow");
        $(".dob-group").show("slow");
        $(".city-group").show("slow");
        $(".gender-group").show("slow");
        $(".hobby-group").show("slow");
        $(".state-group").show("slow");
        $(".prof-group").show("slow");
        $(".salary-group").show("slow");
        $(".favourite-group").show("slow");
        $(".picture-group").show("slow");
        $("#login-submit").prop('value', 'Register');
        event.preventDefault(); // prevents the default behaviour of the button 
    });



    $("#login-submit").click((event) => {
        if ($("#login-submit").attr("value") === 'Register') {
            let name = $("#name").val();
            let dob = $("#dob").val().split("-");
            let year = dob[0];
            let month = dob[1];
            let day = dob[2];
            let city = $("#city").val();
            let hobby = $("#hobbies").val();
            let state = $("#state").val();
            let gender = $("input[name=gender]:checked").val();
            let prof = $("#prof").val();
            let salary = $("#salary").val();
            let favourite = $("#favourite").val();
            // let picture = $("#picture").val();
            let email = $("#email").val();
            let errors = $(".errors");
            const regex_user = /^[a-zA-Z0-9\s]+$/;
            const regex_salary = /^[a-zA-Z0-9,€\s]+$/;
            const regex_email = /\S+@\S+\.\S+/;
            var img_data = "";
            let password = $("#password").val();
            let status = "";
            let count = -1;

            // Validation 
            if (!validate(name, regex_user) || name === " ") {
                status += "<br>Invalid Name *";
                $(".name").text("Name:*");
                $(".name").css("color", "red");
                count++;
            } else {
                $(".name").text("Name:");
                $(".name").css("color", "white");
            }
            if (!validate(city, regex_user) || city === " ") {
                status += "<br>Invalid City *";
                count++;
                $(".city").text("City of Birth:*");
                $(".city").css("color", "red");
                count++;
            } else {
                $(".city").text("City of Birth:");
                $(".city").css("color", "white");
            }
            if (!$("input[name=gender]").is(':checked')) {
                status += "<br>Select a Gender *";
                $(".gender").text("Gender:*");
                $(".gender").css("color", "red");
                count++;
            } else {
                $(".gender").text("Gender:");
                $(".gender").css("color", "white");
            }
            if (!validate(hobby, regex_user) || hobby === " ") {
                status += "<br>Invalid Hobby  *";
                $(".hobby").text("Hobbies:*");
                $(".hobby").css("color", "red");
                count++;
            } else {
                $(".hobby").text("Hobbies:");
                $(".hobby").css("color", "white");
            }
            if (!validate(state, regex_user) || state === " ") {
                status += "<br>Invalid State  *";
                $(".state").text("Civil State*");
                $(".state").css("color", "red");
                count++;
            } else {
                $(".state").text("Civil State:");
                $(".state").css("color", "white");
            }
            if (!validate(prof, regex_user) || prof === " ") {
                status += "<br>Invalid Profession  *";
                $(".prof").text("Prof: ");
                $(".prof").css("color", "red");
                count++;
            } else {
                $(".prof").text("Prof:");
                $(".prof").css("color", "white");
            }
            if (!validate(salary, regex_salary) || salary === " ") {
                status += "<br>Invalid Salary  *";
                $(".salary").text("Salary per Year:*");
                $(".salary").css("color", "red");
            } else {
                $(".salary").text("Salary per Year:");
                $(".salary").css("color", "white");
            }
            if (!validate(favourite, regex_user) || favourite === " ") {
                status += "<br>Invalid Favourite  *";
                $(".favourite").text("Favourite:*");
                $(".favourite").css("color", "red");
                count++;
            } else {
                $(".favourite").text("Favourite:");
                $(".favourite").css("color", "white");
            }
            // if (picture.length <= 0) {
            //     status += "<br>Invalid Picture  *";
            //     $(".picture").text("Upload Picture:*");
            //     $(".picture").css("color", "red");
            //     count++;
            // } else {
            //     $(".picture").text("Upload Picture:");
            //     $(".picture").css("color", "white");
            // }
            if (!validate(email, regex_email) || email === " ") {
                status += "<br>Invalid Email  *";
                $(".email").text("Email:*");
                $(".email").css("color", "red");
                count++;
            } else {
                $(".email").text("Email:");
                $(".email").css("color", "white");
            }
            if (password < 6) {
                status += "<br>Password length must be at least 6 characters long  *";
                $(".password").text("Password:*");
                $(".password").css("color", "red");
                count++;
            } else {
                $(".password").text("Password:");
                $(".password").css("color", "white");
            }
            if (count > 0) {
                errors.html(`Please fix the ${count} Errors to register !${status}`);
                errors.css("color", "red");
                errors.show();
            } else {
                errors.hide();
                day = parseInt(day);
                year = parseInt(year);
                month = parseInt(month);
                // Send a post request to signup the user with the validated credentials
                $.post("/users/signup", {
                    name: name,
                    email: email,
                    password: password,
                    city: city,
                    year: year,
                    day: day,
                    month: month,
                    gender: gender,
                    hobbies: hobby,
                    state: state,
                    salary: salary,
                    favourite: favourite,
                    prof: prof
                }, function(data) {
                    if (data.error) {
                        alert(data.message);
                    } else { // If the process is succesful then allow the user to login 
                        $(".name-group").hide();
                        $(".dob-group").hide();
                        $(".city-group").hide();
                        $(".gender-group").hide();
                        $(".hobby-group").hide();
                        $(".state-group").hide();
                        $(".prof-group").hide();
                        $(".salary-group").hide();
                        $(".favourite-group").hide();
                        $("#login-submit").prop('value', 'Log in');
                    }
                });
            }

        } else { // If the user wants to log in then they provide their email and password and is then checked if the credentials are valid
            let password = $("#password").val();
            let email = $("#email").val();
            $.post("/users/login", {
                email: email,
                password: password
            }, function(data) {
                if (!data.error) {
                    window.location.href = "/home";
                } else {
                    alert(data.message);
                }
            });
        }
    });
    // Simple function to validate a field based on the regex provided
    function validate(value, regex) {
        return regex.test(value);
    }
});