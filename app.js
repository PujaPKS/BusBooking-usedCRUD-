
//endpoint
const url = "https://crudcrud.com/api/f51808980fa64646af1174a8daf4c510";

console.log(axios);


function handleFormSubmition(event){
    event.preventDefault();


//Part-A--->storing all values in database of endpoint
    //pushing references of id in a variable
    const name = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('num');
    const bus = document.getElementById('options');
    
    //storing values of these in object
    const busDetails = {
        name : name.value,
        emailId : email.value,
        phoneNo : phone.value,
        busNo : bus.value
    };

    //moving all the values from object to crud-crud endpoint
    
    //posting all items in database using "POST Request"
    axios.post(`${url}/booking` , busDetails)
    .then((res) => { 
        console.log(res.data);
        window.location.reload(); //page reloader

        //after successful post of data in database now we need to fetch the data from database
        fetchData();
    })
    .catch((err) => { 
        console.log(err);
    });
}


function fetchData(){
    
    //"GET Request" used to fetch data from endpoint database
    axios.get(`${url}/booking`)
    .then((res) => {
        const info = res.data;
        console.log(info);

        //displaying fetched data from database in table a function called where data is passed
        displayInTable(info);
    })
    .catch((err) => {
        console.log(err);
    })
}


//function made for displaying data fetched inside table
function displayInTable(info){
    const tableBody = document.getElementById("BookingList");


    info.forEach((busDetails, index) => {
        
        const row = document.createElement('tr');
            
            //cells for eachDB created
            const serialNumberCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const phoneCell = document.createElement('td');
            const busCell = document.createElement('td');
            const actionCell = document.createElement('td');

            //Part-B(1)--->Added content to table data cells whch will be pushed on adding item
            serialNumberCell.textContent = index+1;
            nameCell.textContent = busDetails.name;
            emailCell.textContent = busDetails.emailId;
            phoneCell.textContent = busDetails.phoneNo;
            busCell.textContent = busDetails.busNo;


            //Delete button creation and function calling
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = () => {
                deleteBooking(busDetails._id);
            };

            //Edit button creation and function calling
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add('btn' , 'btn-primary');
            editButton.onclick = () => {
                editBooking(busDetails , row);
            }

            // Appending buttons to action cell
            actionCell.appendChild(deleteButton);
            actionCell.appendChild(document.createTextNode('\u00A0')); // Add space
            actionCell.appendChild(editButton);

            // Appending all cells to row
            row.appendChild(serialNumberCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);
            row.appendChild(busCell);
            row.appendChild(actionCell);

            // Appended row to table body finally
            tableBody.appendChild(row);
        });   
}



//Function for deleting booking
function deleteBooking(id){
    axios.delete(`${url}/booking/${id}`)
        .then((result) => {
            console.log(result);
            window.location.reload(); //page reloader
        })
        .catch((err) => {
            console.log(err);
        })
}

//Function for editing booking details
function editBooking(busDetails , row){
    const name = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('num')
    const bus = document.getElementById('options');

    //pushing all the data from busDetails object in database inside the boxes of form
    name.value = busDetails.name;
    email.value = busDetails.emailId;
    phone.value = busDetails.phoneNo;
    bus.value = busDetails.busNo;

    //remove row from list
    row.remove();

    //want to update data inside the busDetails
    //object made which has updated data values
    const updatedData = {
        name : name.value,
        emailId : email.value,
        phoneNum : phone.value,
        busNum : bus.value,
    }
   

    // using "DELETE Request" to removed the old user ID after filling all blanks
    axios.delete(`${url}/booking/${busDetails._id}`)
        .then(() => {
            // row removed from list
            row.remove();

            // updating all items in database using "PUT Request"
            axios.put(`${url}/booking/${busDetails._id}`, updatedDetails)
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();//page reloader
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}


// Fetching data when the page loads
window.onload = function () {
    fetchData();
};



//Function for filtering data according to bus selected
function filterOnClick(selectedValue) {
    console.log("selectedValue", selectedValue);

    const alreadyInDom = document.querySelectorAll("tr");
    alreadyInDom.forEach((data) => { 
        data.remove(); 
    })

    axios.get(`${url}/booking`)
        .then((res) => {
            
            if (selectedValue === "All") {
                displayInTable(res.data);
            }
            else {
                let index = 0; //filtered bus index
                res.data.forEach((element) => {
                    
                    if (element.busNo === selectedValue) {
                        const key = element;

                        //evaluating all values by variable name in busDetails
                        const id = key._id;
                        const name = key.name;
                        const email = key.emailId;
                        const phone = key.phoneNo;
                        const busNo = key.busNo;
                        // console.log(key);

                        const tbody = document.querySelector("tbody");

                        const createTr = document.createElement("tr");
                        const createSNo = document.createElement("td");
                        createSNo.textContent = index + 1;

                        const createTdName = document.createElement("td");
                        createTdName.textContent = name;

                        const createTdMail = document.createElement("td");
                        createTdMail.textContent = email;

                        const createTdNumber = document.createElement("td");
                        createTdNumber.textContent = phone;

                        const createBusNo = document.createElement("td");
                        createBusNo.textContent = busNo;

                        //created actionCell for adding buttons
                        const actionCell = document.createElement('td');

                        //Delete button creation and function calling
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.classList.add('btn', 'btn-danger');
                        deleteButton.onclick = () => {
                            deleteBooking(key._id);
                        };

                        //Edit button creation and function calling
                        const editButton = document.createElement('button');
                        editButton.textContent = "Edit";
                        editButton.classList.add('btn' , 'btn-primary');
                        editButton.onclick = () => {
                            editBooking(element , createTr);
                        }

                        // Appended buttons to action cell
                        actionCell.appendChild(deleteButton);
                        actionCell.appendChild(document.createTextNode('\u00A0')); // Add space
                        actionCell.appendChild(editButton);


                        //Appending all items to row of table
                        createTr.appendChild(createSNo);
                        createTr.appendChild(createTdName);
                        createTr.appendChild(createTdMail);
                        createTr.appendChild(createTdNumber);
                        createTr.appendChild(createBusNo);
                        createTr.appendChild(actionCell);

                        //finally appended to table body
                        tbody.appendChild(createTr);

                        index++; //filtered index increamented
                    }
                });

            }       
        })
        .catch((error) => {
            console.log(error);
        });
}