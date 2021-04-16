/**
 * @description This file contains functions that use objects, and returns objectrelated stuff
 */

(function(){
    window.objectFunctions = {getLSValuesOfGroupNameAsKey, getstudentByStudentName, getStudentIdxInGroupByStudentName, getLSValuesOfGroup};
    /**
     * @summary Creates and returns a new array with the learningstyle values of the learningstyle with the learningstyle name provided in the learnStyleName argument
     * @param {object} group the group from which to get the data
     * @param {string} learnStyleName the name of the learningstyle e.g. "activeReflective"
     * @returns {object} returns an object with the students of the groups values in the given learningstyle, in the format {studentname: learningstylevalue} e.g. {jens: -3}
     */
    function getLSValuesOfGroupNameAsKey(group, learnStyleName){
        const resArray = new Array();
        for (const student of group.students) {
            resArray[student.name] = student.criteria.learningStyles[learnStyleName];
        }
        return resArray;
    }

    /**
     * @summary Gets and return the student object from the studentName, return the student object where (student.name === studentName)
     * @param {object} group the group from which to find and get the student
     * @param {string} studentName the name of the student to find and return
     * @returns {object} return the student object from the group object where student.name === studentName
     */
    function getstudentByStudentName(group, studentName){
        for (const student of group.students) {
            if (student.name === studentName){
                return student;
            }
        }
    }
    /**
     * @summary Gets and returns the students index in the group object (used to determine the color to be assigned to the student)
     * @param {object} group the group in which the find the student by their name
     * @param {string} studentName the name of the student
     * @returns {number} returns the students index in the group object
     */
    function getStudentIdxInGroupByStudentName(group, studentName){
        // Finds the students in the group object
        for (const studentArray of Object.entries(group).filter((entry)=>entry[0] === "students")) {
            // Iterates through the only student where the student.name === studentName
            for (const val of studentArray[1].filter((entry)=>entry.name === studentName)) {
                // Finds and returns the index of the student in the group.students object
                return studentArray[1].indexOf(val);
            }
        }
    }
    /**
     * @summary Creates and returns a new array with the learningstyle values(-11 to 11)
     * of the learningstyle with the learningstyle(e.g. active, visual, sensing..) name provided in the learnStyleName argument
     * @param {object} group the group from which to get the data
     * @param {string} learnStyleName the name of the learningstyle e.g. "activeReflective"
     * @returns {Array} returns an array with the students of the groups values in the given learningstyle
     */
    function getLSValuesOfGroup(group, learnStyleName){
        const resArray = new Array();
        for (const student of group.students) {
            resArray.push(student.criteria.learningStyles[learnStyleName]);
        }
        return resArray;
    }
}());