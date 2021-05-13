# p2-groupformation

This project facillitates groupformation of students.
The students start out in a one-man group.
A group can invite another group.
If both groups invite each other they merge.
This program gives the students a list of groups they can merge with.
This list is sorted by how good the compatibillity of these two groups are.
Compatabillity is calculated by an algorithm assessing the two groups' criteria.


There are serveral different subprograms that we developed to help assess different algorithms.

To run any of these programs you need to have `node` and `npm` installed.
Windows users need to download and install node from here:
https://nodejs.org/en/download/

Archlinux user can install these programs with this command:
```
sudo pacman -Suy nodejs npm
```

Clone the project, `cd` into this project and run the following command to install the dependencies:
```
npm install
```

## Generators

The `src/gen` folder contains programs that are used to generate students and groups.

Students are generated with the `studentgenerator.js` script which can be run with `npm run student-gen <num students> <num subjects> <filename>`.
The output is stored in the file given by the `filename` argument.
This file is a json file in which the students are stored.

Groups are generated with the `groupgenerator.js` script.
This can be run with `npm run group-gen <algorithm> <max groupsize> <input filename> <output filename>`.
The group generator works by choosing a random group and merging it with the best candidate group assessed by the supplied algorithm.
This process continues until no more groups can be merged.
The algorithm has to be specified in the `algorithm` argument.
It can take one of the following values:
```
random
0point
distance
amalgemation
mindistance
vectormindistance0.5constant
vectormindistance1constant
vectormindistance2constant
vectormindistance3constant
vectormindistance0.5sigmoid
vectormindistance1sigmoid
vectormindistance2sigmoid
vectormindistance3sigmoid
vectoravgdistance0.5constant
vectoravgdistance1constant
vectoravgdistance2constant
vectoravgdistance3constant
vectoravgdistance0.5sigmoid
vectoravgdistance1sigmoid
vectoravgdistance2sigmoid
vectoravgdistance3sigmoid
```

The input filename is a json file containing students.
It can be generated with the student generator.
The output filename is a json file in which the groups will be written to.


## Visualizer

To assess how good an algorithm is we use the group generator with the algorithm we want to test.
This generates a json file with groups.
To give us more insight in how the algorithm performs we created a visualizer.
The visualizer code is in the `src/visualizer` folder.
This is a webserver that serves html and javascript which can be accessed in the browser.
Starting the webserver is done by running the command `npm run vis`.
The server will then give you an url you can access in the browser.


## Group formation site

This is the main program in this project.
It makes it possible for students to log in and form groups.
This is implemented as a webserver serving html and javascript to the browser.
The code for the serverside of this program is in the `src` folder.
The html and javascript served to the browser is in the `src/www` folder.
The webserver can be run with the command `npm run main`.
The server will then tell you the url where you can access it in the browser.

You can customize different aspects of the group formation site in the `config.json` file.
Here there are configuration options for the webserver, the algorithms and weights used in the compatibillity assessment, among other things.
The students are provided to the server in a json file.

On the browser it is possible to log in as a student.
This is done by logging in with the student's name.
When the login is complete the user will be redirected to the group formation interface.
This is where the student can invite and merge with groups.
