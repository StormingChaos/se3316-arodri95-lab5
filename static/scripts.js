document.getElementById('get-courses').addEventListener('click', getCourses);
getFilters();
document.getElementById('get-schedules').addEventListener('click', getSchedules);
document.getElementById('apply-filters').addEventListener('click', getFilters);
document.getElementById('show-schedule').addEventListener('click', getDetails);

//remove all special characters from string
function sanitize(str){
    str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim,"");
    return str.trim();
}

//print the list of courses
function getCourses() {
    fetch("/api/catalogue")
    .then(res => res.json()
    .then(data => {
        console.log(data);
        const list = document.getElementById('results-list');
        //clear the list before updating it
        list.textContent = "";
        data.forEach(e => {
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`${e.catalog_nbr} ${e.subject}: ${e.className}`));
            list.appendChild(item);
        });
    }))
}

//print the list fo schedules
function getSchedules() {
    fetch("/api/catalogue/schedules")
    .then(res => res.json()
    .then(data => {
        console.log(data);
        const list = document.getElementById('results-list');
        //clear the list before updating it
        list.textContent = "";
        data.forEach(e => {
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`Schedule Name: \"${e.name}\" Number of Courses: ${e.numCourses}`));
            list.appendChild(item);
        });
    }))
}

function getDetails(){
    const schedule = document.getElementById('schedule-dropdown').value;
    if (schedule != "Choose a Schedule")
    {
        fetch(`/api/catalogue/schedules/${schedule}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            const list = document.getElementById('results-list');
            //clear the list before updating it
            list.textContent = "";

            const details = document.createElement('p');
            details.appendChild(document.createTextNode(`Schedule Name: \"${data.name}\" Number of Courses: ${data.numCourses}`));
            list.appendChild(details);
            for (var i = 0; i < data.numCourses; i++)
            {
                const item = document.createElement('li')
                item.appendChild(document.createTextNode(`${data.courses[i].Subject} ${data.courses[i].Code}`));
                list.appendChild(item);
            }
        }))
    }
}

function getFilters() {
    //get dropdown values
    const subject = document.getElementById('subject-dropdown').value;
    const courseCode = document.getElementById('course-code-dropdown').value;

    if (subject != "Show all Subjects")
    {
        if (courseCode != "Refine by Course Code")
        {
            fetch(`/api/catalogue/subjects/${subject}/${courseCode}`)
            .then(res => res.json()
            .then(data => {
                console.log(data);
                const list = document.getElementById('results-list');
                //clear the list before updating it
                list.textContent = "";
                data.forEach(e => {
                    const item = document.createElement('li');
                    item.appendChild(document.createTextNode(`Subject: \"${subject}\" Course Code: ${courseCode} Class Name: \"${e.className}\" Description: \"${e.catalog_description}\"`));
                    list.appendChild(item);
                });
            }))
        }
        else{
            fetch(`/api/catalogue/subjects/${subject}`)
            .then(res => res.json()
            .then(data => {
                console.log(data);
                const list = document.getElementById('results-list');
                //clear the list before updating it
                list.textContent = "";
                data.forEach(e => {
                    const item = document.createElement('li');
                    item.appendChild(document.createTextNode(`Subject: \"${subject}\" Course Code: ${e.catalog_nbr}`));
                    list.appendChild(item);
                });
            }))
        }
    }
    else{ // get list of subjects
        fetch("/api/catalogue/subjects")
        .then(res => res.json()
        .then(data => {
            console.log(data);
            const list = document.getElementById('results-list');
            //clear the list before updating it
            list.textContent = "";
            data.forEach(e => {
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(`Subject: \"${e.subject}\" Class Name: ${e.className}`));
                list.appendChild(item);
            });
        }))
    }
}

//populate dropdowns
// Subject Dropdown
fetch("/api/catalogue/subjects")
.then(res => res.json()
.then(data => {
    console.log(data);
    const list = document.getElementById('subject-dropdown');
    const list2 = document.getElementById('add-subject');
    //find first subject
    const option = document.createElement("option");
    option.textContent = data[0].subject;
    option.value = data[0].subject;
    list.appendChild(option);
    const option2 = document.createElement("option");
    option2.textContent = data[0].subject;
    option2.value = data[0].subject;
    list2.appendChild(option2);
    for(var i = 1; i < data.length; i++){
        if (data[i].subject != data[i-1].subject)
        {
            const option = document.createElement("option");
            option.textContent = data[i].subject;
            option.value = data[i].subject;
            list.appendChild(option);
            const option2 = document.createElement("option");
            option2.textContent = data[i].subject;
            option2.value = data[i].subject;
            list2.appendChild(option2);
        }
    }
}))

// Schedule Names Dropdowns
function populateSchedules() {
    fetch("/api/catalogue/schedules")
    .then(res => res.json()
    .then(data => {
        console.log(data);
        const list = document.getElementById('schedule-name-dropdown');
        const list2 = document.getElementById('schedule-dropdown');

        //clear options before updating
        for (var i = list.options.length-1; i > 0; i--)
        {
            list.remove(i);
            list2.remove(i);
        }

        for(var i = 0; i < data.length; i++){
            const option = document.createElement("option");
            const option2 = document.createElement("option");
            option.textContent = data[i].name;
            option.value = data[i].name;
            option2.textContent = data[i].name;
            option2.value = data[i].name;
            list.appendChild(option);
            list2.appendChild(option2);
        }
    }))
}
populateSchedules();

//course code dropdown
document.getElementById('subject-dropdown').addEventListener('change', populateCoursesSearch);
document.getElementById('add-subject').addEventListener('change', populateCoursesAdd);
function populateCoursesSearch () {
    const subject = document.getElementById('subject-dropdown').value;
    const list = document.getElementById('course-code-dropdown');
    if (subject == "Show all Subjects")
    {
        for (var i = list.options.length-1; i > 0; i--)
        {
            list.remove(i);
        }
    }
    else{
        fetch(`/api/catalogue/subjects/${subject}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            //clear options before updating
            for (var i = list.options.length-1; i > 0; i--)
            {
                list.remove(i);
            }
            for(var i = 0; i < data.length; i++){
                const option = document.createElement("option");
                option.textContent = data[i].catalog_nbr;
                option.value = data[i].catalog_nbr;
                list.appendChild(option);
            }
        }))
    }
}
function populateCoursesAdd () {
    const subject = document.getElementById('add-subject').value;
    const list = document.getElementById('add-course');
    if (subject == "Choose a Subject")
    {
        for (var i = list.options.length-1; i > 0; i--)
        {
            list.remove(i);
        }
    }
    else{
        fetch(`/api/catalogue/subjects/${subject}`)
        .then(res => res.json()
        .then(data => {
            console.log(data);
            //clear options before updating
            for (var i = list.options.length-1; i > 0; i--)
            {
                list.remove(i);
            }
            for(var i = 0; i < data.length; i++){
                const option = document.createElement("option");
                option.textContent = data[i].catalog_nbr;
                option.value = data[i].catalog_nbr;
                list.appendChild(option);
            }
        }))
    }
}

//component dropdown
const compDropdown = document.getElementById('component-dropdown');
const option1 = document.createElement('option');
option1.textContent = "Lec";
option1.value = "Lec";
compDropdown.appendChild(option1);

//create schedule with name
document.getElementById('create-schedule').addEventListener('click', createSchedule);
function createSchedule() {
    const input = sanitize(document.getElementById('schedule-name').value);
    if (input == "")
    {
        alert("Invalid Name");
    }
    else{
        const schedule = {name:input, courses:[]};

        fetch("api/catalogue/schedules", {method: 'post', headers:{"Content-Type": "Application/json"}, body: JSON.stringify(schedule)})
        .then((res) => res.status)
        .then(data => {
            if (data === 200) {
                //print success message
                console.log("SUCCESS");
                populateSchedules();
            }
            else{
                //print error message
                console.log("FAILURE");
            }
        })
    }
}

//add courses to temp list
var courseList = [];
document.getElementById('update-list').addEventListener('click', addCourse);
function addCourse() {
    const subject = document.getElementById('add-subject').value;
    const course = document.getElementById('add-course').value;
    if (course == "Choose a Course Code"){
        alert("Must select a course to add");
    }
    else{
        //check for duplicate courses
        const match = courseList.findIndex(c => c.Subject == subject);
        const dup = courseList.findIndex(c => c.Code == course);
        if (dup == -1 && match == -1)
        {
            // add course to pending list
            courseList.push({Subject:subject, Code:course});

            // display course in box
            const list = document.getElementById("pending");
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`Subject: ${subject}, Course Code: ${course}`));
            list.appendChild(item);
        }
        else{
            alert("Cannot add duplicate course");
        }
    }
}

//clear selected courses
document.getElementById('clear-pending').addEventListener('click', clearPending);
function clearPending() {
    courseList = [];
    const list = document.getElementById('pending');
    list.textContent = "";
}

//add courses to schedule
document.getElementById('confirm-list').addEventListener('click', confirmUpdate);
function confirmUpdate() {
    const schedule = document.getElementById('schedule-name-dropdown').value;
    if (schedule == "Choose a Schedule"){
        alert("Must select a schedule to update");
    }
    else {
        const update = {name:schedule, courses:courseList};
        clearPending();

        fetch(`api/catalogue/schedules/${schedule}`, {method: 'put', headers:{"Content-Type": "Application/json"}, body: JSON.stringify(update)})
        .then((res) => res.status)
        .then(data => {
            if (data === 200) {
                //print success message
                console.log("SUCCESS");
                populateSchedules();
            }
            else{
                //print error message
                console.log("FAILURE");
            }
        })
    }
}

//delete schedule with name
document.getElementById('delete-schedule').addEventListener('click', deleteSchedule);
function deleteSchedule() {
    const schedule = document.getElementById("schedule-name-dropdown").value;
    if (schedule == "Choose a Schedule")
    {
        alert("Must select schedule to delete");
    }
    else{
        fetch(`api/catalogue/schedules/${schedule}`, {method: 'delete'})
        .then((res) => res.status)
        .then(data => {
            if (data === 200) {
                //print success message
                console.log("SUCCESS");
                populateSchedules();
            }
            else{
                //print error message
                console.log("FAILURE");
            }
        })
    }
}

//delete all schedules
document.getElementById('delete-all').addEventListener('click', deleteAll);
function deleteAll() {
    fetch(`api/catalogue/schedules`, {method: 'delete'})
    .then((res) => res.status)
    .then(data => {
        if (data === 200) {
            //print success message
            console.log("SUCCESS");
            populateSchedules();
            alert("All Schedules Deleted");
        }
        else{
            //print error message
            console.log("FAILURE");
        }
    })
}