/*
Week 08 Coding Assignment Steps:
Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
    1) Use at least one array.
    2) Use at least two classes.
    3) Your menu should have the options to create, view, and delete elements.
*/

//School Class List and Roster

class Student {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
    describe() {
        return `${this.name} is a ${this.level}.`
    }
}
//Above is a class Student which will create a new student with their name and class level (e.g. Freshman)

class Class {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.students = [];
    }
    addStudent(student) {
        if (student instanceof Student) {
            this.students.push(student);
        } else {
            throw new Error (`You can only add Students to class roster. ${student} has not been added as a Student.`);
        }
    }
    describe() {
        return `${this.title} is taught by ${this.instructor} and has ${this.students.lenght} students.`;
    }
}
//Above is a class Class which will create a new class with a title and an instructor and you can add students with the addStudent method.

class Menu {
    constructor() {
        this.classes = [];
        this.selectedClass = null;      //Manages one team at a time
    }
    start() {                           //Entry point to Menu app
        let selection = this.showMainMenuOptions();
        while (selection !== 0) {
            switch (selection) {
                case '1':
                    this.createClass();
                    break;
                case '2':
                    this.viewClass();
                    break;
                case '3':
                    this.deleteClass();
                    break;
                case '4':
                    this.displayClasses();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ('Exiting Menu')
    }
    showMainMenuOptions() {
        return prompt(`
            0) Exit Menu
            1) Create New Class
            2) View A Class
            3) Delete A Class
            4) Display All Classes
            `);
    }
    showClassMenuOptions(classInfo) {       //Where does classInfo come from?
        return prompt(`
            0) Go Back
            1) Add a Student
            2) Delete a Student
            -------------------
            ${classInfo}
            `);
    }
    displayClasses() {
        let classString = "";
            for(let i = 0; i < this.classes.length; i++) {
                classString += i`) ${this.classes[i].title} - ${this.classes[i].instructor}\n`;
            }
        alert(classString);
    }
    createClass() {
        let title = prompt('Enter the title of the class');
        this.classes.push(new Class(title));
        let instructor = prompt('Enter the instructor for the new class');
        this.classes.push(new Class(instructor));
    }
    viewClass() {
        let index = prompt('Enter the index of the class you wish to view');
        if (index > -1 && index < this.classes.length) {
            this.selectedClass = this.classes[index];
            let description = 'Class Title: ' + this.selectedClass.title + ' taught by ' + this.selectedClass.instructor + '\n';
            for (let i = 0; i < this.selectedClass.students.length; i++) {
                description += i + ') ' + this.selectedClass.students[i].describe() + '\n';
            }
            let selection1 = this.showClassMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createStudent();
                    break;
                case '2':
                    this.deleteStudent();
            }
        }
    }
    deleteClass() {
        let index = prompt('Enter the index of the class you wish to delete');
        if (index > -1 && index < this.classes.length) {
            this.classes.splice(index, 1);
        }
    }
    createStudent() {
        let name = prompt('Enter the name of the new student');
        let level = prompt('Enter the grade level of the new student');
        this.selectedClass.students.push(new Student(name, level));
    }
    deleteStudentStudent() {
        let index = prompt('Enter the index of the student you wish to delete from the class');
        if (index > -1 && index < this.selectedClass.students.length) {
            this.selectedClass.students.splice(index, 1);
        }
    }
}
let menu = new Menu;
menu.start();