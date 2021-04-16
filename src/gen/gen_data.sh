#!/bin/bash

algorithms=("random" "0point" "distance" "amalgemation"
    "mindistance"
    "vectormindistance0.1constant"
    "vectormindistance0.5constant"
    "vectormindistance1constant"
    "vectormindistance2constant"
    "vectormindistance3constant"
    "vectormindistance0.5sigmoid"
    "vectormindistance1sigmoid"
    "vectormindistance2sigmoid"
    "vectormindistance3sigmoid"
    "vectoravgdistance0.5constant"
    "vectoravgdistance1constant"
    "vectoravgdistance2constant"
    "vectoravgdistance3constant"
    "vectoravgdistance0.5sigmoid"
    "vectoravgdistance1sigmoid"
    "vectoravgdistance2sigmoid"
    "vectoravgdistance3sigmoid"
  )

studentsizes=(75 150 300)

# Generate students
for size in "${studentsizes[@]}"
do
    npm run student-gen "$size" "0" "${size}students.json"
done

# Generate groups
for algorithm in "${algorithms[@]}"
do
  for size in "${studentsizes[@]}"
  do
    for run in {1..3}
    do
      npm run group-gen "$algorithm" "7" "${size}students.json" "src/visualizer/data/${algorithm}-${size}-${run}.json"
    done
  done
done
