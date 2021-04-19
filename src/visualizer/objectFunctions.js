/**
 * @description This file contains functions that use objects, and returns objectrelated stuff
 */

(function(){
    window.objectFunctions = {getLSValuesOfGroup};
    /**
     * @summary Creates and returns a new array with the learningstyle values(-11 to 11)
     * of the learningstyle with the learningstyle(e.g. active, visual, sensing..) name provided in the learnStyleName argument
     * @param {object} group the group from which to get the data
     * @param {string} learnStyleName the name of the learningstyle e.g. "activeReflective"
     * @returns {object} returns an object with the students of the groups values in the given learningstyle, the key is the students idx in the groups.students
     */
    function getLSValuesOfGroup(group, learnStyleName){
        const resArray = new Array();
        for (const studentIdx in group.students) {
            resArray[studentIdx] = group.students[studentIdx].criteria.learningStyles[learnStyleName];
        }
        return resArray;
    }
}());