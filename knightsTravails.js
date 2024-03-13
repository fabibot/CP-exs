/*objectif: 
créer une function qui prend en entré une position de départ,
et une position d'arriver et qui retourne le chemin 
le plus court possible */


function Node(data){
    this.data = data;
    this.child = null;
}

function knightMoves(start, end){
    let firstNode = new Node(start);
    let possiblePlaces = getPossibleMouvement(start);
    firstNode.child = createNodes(possiblePlaces);
    let possibleEnds = getPossibleArrivals(end);

    let finalPath = findPaths(firstNode, possibleEnds);
    console.log(finalPath);
   

function findPaths(node, endsArray, resultArray = []){
    for(let element of node.child){
        if(element.data != null){
            let index = 0;
            for(let position of endsArray){
                if(position){
                    if(position[0] == element.data[0] && position[1] == element.data[1]){
                        console.log(element);
                        console.log("resultat trouvé");
                        resultArray.push(element.data);
                        return element;
                    }
                }
                index++;
            }
        }
        // console.log(element.data)
    }
    for(let path of node.child){
        if(path.data){
            let pathArray = getPossibleMouvement(path.data);
            path.child = createNodes(pathArray);
            // console.log(path)
            findPaths(path, endsArray, resultArray);
        }
    }
    return resultArray;
    //trouver comment remplir le tableau;
}
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
    return possibleDirections;
}
// function getPossibleArrivals(start){
    // let possibleDirections = [];
    // let positionX = start[0];
    // let positionY = start[1];
    // if(positionX - 2 > -1){
    //     if(positionY - 1 > -1){
    //         possibleDirections.push([positionX - 2, positionY - 1]);
    //     } if(positionY + 1 < 8){
    //         possibleDirections.push([positionX - 2, positionY + 1]);
    //     }
    // } if(positionX + 2 < 8){
    //     if(positionY - 1 > -1){
    //         possibleDirections.push([positionX + 2, positionY - 1]);
    //     } if(positionY + 1 < 8){
    //         possibleDirections.push([positionX + 2, positionY + 1]);
    //     }
    // }
    // if(positionY - 2 > -1){
    //     if(positionX - 1 > -1){
    //         possibleDirections.push([positionY - 2, positionX - 1]);
    //     } if(positionX + 1 < 8){
    //         possibleDirections.push([positionY - 2, positionX + 1]);
    //     }
    // } if(positionY + 2 < 8){
    //     if(positionX - 1 > -1){
    //         possibleDirections.push([positionY + 2, positionX - 1]);
    //     } if(positionX + 1 < 8){
    //         possibleDirections.push([positionY + 2, positionX + 1]);
    //     }
    // }
    // return possibleDirections;
// }

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
    return possibleGoals;
}
function createNodes(array){
    let tab = [];
    for(let element of array){
        let node = new Node(element);
        tab.push(node);
    }
    return tab;
}

knightMoves([1, 6], [4, 4] ); // [3, 2]