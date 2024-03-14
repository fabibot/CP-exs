//ma méthode a été de calculer tous les chemins possibles pour atteindre l'objectif, puis de trouver le chemin le plus court parmis les résultats trouvés...
// const { result } = require("lodash");

function Node(data){
    this.data = data;
    this.parent = null;
    this.child = null;
}

function knightMoves(start, end){
    let firstNode = new Node(start);
    let possiblePlaces = getPossibleMouvement(start);
    let possibleEnds = getPossibleArrivals(end);    
    let finalPath = [];
    if(possiblePlaces.find((element) => element[0] == end[0] && element[1] == end[1])){
        printResult(start, end)
    } else{
        firstNode.child = createNodes(possiblePlaces);
        let totalPaths = findPaths(firstNode, possibleEnds);
        finalPath.push(findShortestPath(totalPaths));
        printResult(start, end, finalPath[0]);
    }
}   

function findShortestPath(nodeFound){
    let bestCount = 20;
    let finalPath;
    for(let node of nodeFound){
        let currentNode = node;
        let nodeCount = 0;
        let path = [];
        while(currentNode != null){
            path.push(currentNode.data);
            currentNode = currentNode.parent;
            nodeCount++;
        }
        if(nodeCount < bestCount){
            bestCount = nodeCount;
            finalPath = path;
        }
    }
    return finalPath;
}

function findPaths(node, endsArray, resultArray = [], visitedPts = []){
    for(let element of node.child){
        for(let position of endsArray){
            if(position[0] == element.data[0] && position[1] == element.data[1]){
                // console.log("chemin trouvée")
                element.parent = node;
                resultArray.push(element);
                if(resultArray.length < 6){
                    return resultArray;
                } else {
                    return 0;
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
            path.parent = node;
            let x = findPaths(path, endsArray, resultArray, visitedPts);
            if(x == 0){
                return resultArray;

            }
        }
    }
    return resultArray;  
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

function printResult(start, end, path){
    let mouveCount = 1;
    if(path){
        mouveCount += path.length;
    }
    console.log(`KnightMoves : ${start} ---> ${end}`);
    console.log(`You can make it in ${mouveCount} moves ! Here's your path :`)
    if(!path){
        console.log(start);
        console.log(end);
    } else {
        for(let i = path.length - 1; i > -1; i--){
            console.log(path[i])
        }
        console.log(end)
    }
    
}


knightMoves([0, 7], [4, 6]); 

