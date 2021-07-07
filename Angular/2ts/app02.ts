let age:number = 5;
console.log(age);

let myName:string;
myName = 'Jack';
console.log(myName);

let anything:any;
anything = 3;
anything = 'John';
console.log(anything);

let unknownthing:unknown;
unknownthing = 'unknown';
console.log(unknownthing);

let grades = [3.9, 4.0];
let anyArray:[any]; 
let mixedArray = [3.8, 'Snow'];
let difinedArray: [(string | boolean)];
enum Color {
    RED, GREEN=100, BLUE
};
let  favColor: Color = Color.BLUE;
console.log(favColor);

let course: string|number;
let courses: (string|number)[];

interface Course {
    title: string;
    capacity: number; 
}

class OnCampusCourse implements Course {
    title: string;
    capacity: number;
    static university: string = 'MIU';
    private instructor: string;

    constructor(titleParam: string, capacityParam: number, instructorParam: string) {
        this.title = titleParam;
        this.capacity = capacityParam;
        this.instructor = instructorParam;
    }
}

let cs572:Course = new OnCampusCourse('MWA', 25, 'Nageeb');
console.log(cs572);