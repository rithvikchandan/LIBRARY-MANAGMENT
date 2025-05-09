document.addEventListener("DOMContentLoaded", function () {
    // Load members from Local Storage or use default data
    let members = JSON.parse(localStorage.getItem("members")) || [
        { id: 1, name: "Alice Johnson", email: "se22uari011@mahindrauniversity.edu.in", phone: "9876543210" },
        { id: 2, name: "Bob Smith", email: "se21uari000@mahindrauniversity.edu.in", phone: "8765432109" },
        { id: 3, name: "Charlie Brown", email: "se20uari020@mahindrauniversity.edu.in", phone: "7654321098" }
    ];

    // DOM Elements
    const membersTableBody = document.getElementById("members-table-body");
    const searchInput = document.getElementById("search-input");
    const addMemberModal = document.getElementById("addMemberModal");
    const addMemberBtn = document.getElementById("add-member-btn");
    const closeModal = document.querySelector(".close");
    const addMemberForm = document.getElementById("addMemberForm");

    let editMode = false;
    let editMemberId = null;

    // Save Members to Local Storage
    function saveToLocalStorage() {
        localStorage.setItem("members", JSON.stringify(members));
    }

    // Display Members in the Table
    function displayMembers() {
        membersTableBody.innerHTML = ""; 
        members.forEach(member => {
            let row = `<tr>
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>
                    <button class="edit-btn" onclick="editMember(${member.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="deleteMember(${member.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
            membersTableBody.innerHTML += row;
        });
    }

    displayMembers();

    // Search Members
    searchInput.addEventListener("input", function () {
        let searchValue = searchInput.value.toLowerCase();
        let filteredMembers = members.filter(member =>
            member.name.toLowerCase().includes(searchValue) ||
            member.email.toLowerCase().includes(searchValue) ||
            member.phone.includes(searchValue)
        );
        membersTableBody.innerHTML = "";
        filteredMembers.forEach(member => {
            let row = `<tr>
                <td>${member.id}</td>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>
                    <button class="edit-btn" onclick="editMember(${member.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" onclick="deleteMember(${member.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
            membersTableBody.innerHTML += row;
        });
    });

    // Show Add Member Modal
    addMemberBtn.addEventListener("click", function () {
        addMemberModal.style.display = "block";
        addMemberForm.reset();
        editMode = false;
    });

    // Close Modal
    closeModal.addEventListener("click", function () {
        addMemberModal.style.display = "none";
    });

    // Handle Add or Edit Member Form Submission
    addMemberForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let name = document.getElementById("member-name").value;
        let email = document.getElementById("member-email").value;
        let phone = document.getElementById("member-phone").value;

        if (editMode) {
            // Update Existing Member
            members = members.map(member =>
                member.id === editMemberId ? { id: member.id, name, email, phone } : member
            );
        } else {
            // Add New Member
            let newMember = {
                id: members.length + 1,
                name: name,
                email: email,
                phone: phone
            };
            members.push(newMember);
        }

        saveToLocalStorage();
        displayMembers();
        addMemberModal.style.display = "none";
        addMemberForm.reset();
        editMode = false;
        editMemberId = null;
    });

    // Edit Member Function
    window.editMember = function (id) {
        let memberToEdit = members.find(member => member.id === id);
        if (memberToEdit) {
            document.getElementById("member-name").value = memberToEdit.name;
            document.getElementById("member-email").value = memberToEdit.email;
            document.getElementById("member-phone").value = memberToEdit.phone;

            editMode = true;
            editMemberId = id;
            addMemberModal.style.display = "block";
        }
    };

    // Delete Member Function
    window.deleteMember = function (id) {
        members = members.filter(member => member.id !== id);
        saveToLocalStorage();
        displayMembers();
    };
});
