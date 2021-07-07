var age = 5;
console.log(age);
var myName;
myName = 'Jack';
console.log(myName);
var anything;
anything = 3;
anything = 'John';
console.log(anything);
var unknownthing;
unknownthing = 'unknown';
console.log(unknownthing);
var grades = [3.9, 4.0];
var anyArray;
var mixedArray = [3.8, 'Snow'];
var difinedArray;
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 100] = "GREEN";
    Color[Color["BLUE"] = 101] = "BLUE";
})(Color || (Color = {}));
;
var favColor = Color.BLUE;
console.log(favColor);
var course;
var courses;
var OnCampusCourse = /** @class */ (function () {
    function OnCampusCourse(titleParam, capacityParam, instructorParam) {
        this.title = titleParam;
        this.capacity = capacityParam;
        this.instructor = instructorParam;
    }
    OnCampusCourse.university = 'MIU';
    return OnCampusCourse;
}());
var cs572 = new OnCampusCourse('MWA', 25, 'Nageeb');
console.log(cs572);
