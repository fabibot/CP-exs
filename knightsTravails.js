
// const { result } = require("lodash");

function Node(data){
    this.data = data;
    this.child = null;
}

function knightMoves(start, end){
    //gérer la situation où il faut qu'1 pas pour aller de start à end!
    let firstNode = new Node(start);
    let possiblePlaces = getPossibleMouvement(start);
    firstNode.child = createNodes(possiblePlaces);
    let possibleEnds = getPossibleArrivals(end);
    let finalPath = findPaths(firstNode, possibleEnds);
    console.log(finalPath);
    console.log(firstNode);
   

function findPaths(node, endsArray, resultArray = [], visitedPts = []){

    for(let element of node.child){
        if(element.data != null){
            for(let position of endsArray){
                if(position[0] == element.data[0] && position[1] == element.data[1]){
                    resultArray.push(position);
                    console.log("chemin trouvée")
                    if(resultArray.length < 4){
                        return resultArray;
                    } else {
                        return 0;
                    }
                }

            }
        }
    }
    if(!visitedPts.find((element) => element == node.data)){
        visitedPts.push(node.data);
    }

    for(let path of node.child){
        if(path.data){
            let pathArray = getPossibleMouvement(path.data);
            let sortedPathArray = sortPath(pathArray, visitedPts);
            path.child = createNodes(sortedPathArray);
            let x = findPaths(path, endsArray, resultArray, visitedPts);
            if(x == 0){
                return resultArray;

            }
        }
    }
    return resultArray;
    //si 2 chemin arrive au même chemin, suprimer le plus long des deux
    //trouver comment remplir le tableau;   
}
}

function sortPath(array1, array2){
    return array1.filter(subarray1 => {
        return !array2.some(subarray2 => {
            return subarray1.every((value, index) => value === subarray2[index]);
        });
    });
}

function getPossibleMouvement(start){
    let possibleDirections = [];
    let calculs1 = [-2, 2, -2, 2, 1, -1, -1, 1];
    let calculs2 = [-1, -1, 1, 1, -2, -2, 2, 2];
    let positionX = start[0];
    let positionY = start[1];
    const totalPossibilities = 8;
    for(let i = 0; i < totalPossibilities; i++){
        possibleDirections[i] = [positionX + calculs1[i], positionY + calculs2[i]]; 
        if(possibleDirections[i][0] < 0 || possibleDirections[i][0] > 7 || possibleDirections[i][1] < 0 || possibleDirections[i][1] > 7 ){
            possibleDirections[i] = null;
        }
        // console.log(possibleDirections[i]);
    }
    let possibleDirectionsFiltred = possibleDirections.filter((element) => element != null);
    return possibleDirectionsFiltred;
}
function getPossibleArrivals(end){
    let possibleGoals = [];
    let calculs1 = [-1, -1, 1, 1, -2, -2, 2, 2];
    let calculs2 = [-2, 2, -2, 2, 1, -1, -1, 1];
    let positionX = end[0];
    let positionY = end[1];
    const totalPossibilities = 8;
    for(let i = 0; i < totalPossibilities; i++){
        possibleGoals[i] = [positionX + calculs1[i], positionY + calculs2[i]]; 
        if(possibleGoals[i][0] < 0 || possibleGoals[i][0] > 7 || possibleGoals[i][1] < 0 || possibleGoals[i][1] > 7 ){
            possibleGoals[i] = null;
        }
        // console.log(possibleGoals[i]);
    }
    let possibleGoalsFiltred = possibleGoals.filter((element) => element != null);
    return possibleGoalsFiltred;
}
function createNodes(array){
    let tab = [];
    for(let element of array){
        let node = new Node(element);
        tab.push(node);
    }
    return tab;
}

knightMoves([1, 6], [4, 4]); 
