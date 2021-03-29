module.exports = {inputCheck};
/**
 * @summary Measures the balance of criterias in a group
 * @param {number[][]} criteria 2d array with students and their criterias
 * @throws {Error} throws an error if there are no students in the array,
 * the student has no criteria or if the students dont have the same number of criteria
 */
function inputCheck(criteria){
    if(criteria.length === 0){
        throw Error("No students in the input array");
    }
    if(criteria[0].length === 0){
        throw Error("Student has no criteria");
    }
    for (const students of criteria) {
        if(students.length !== criteria[0].length){
            throw Error("Criteria array not the same length on all students");
        }
    }
}