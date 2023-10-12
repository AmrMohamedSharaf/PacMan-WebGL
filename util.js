export function getNormllizedCoords(coordvec , xAxisSize , yAxisSize){
	let xhalfAxisSize = xAxisSize/2;
	let yhalfAxisSize = yAxisSize/2;

	let normX = (coordvec[0]/xAxisSize)-1;
	let normY = (coordvec[1]/yAxisSize)-1;
	return[normX , normY];

}


// Queue Data structure that's used for the BFS implemnetation 
export class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
      return this.items.shift();
    }
  

  
    isEmpty() {
      return this.items.length === 0;
    }
  

  }


  // To Do rename this functions becasue it's not just for the X axis 

export function getNormllizedXCoords(coordvec , xAxisSize){
	let xhalfAxisSize = xAxisSize/2;


	let normX = (coordvec/xAxisSize)-1;
	return normX;

}


export function getNormllizedYCoords(coordvec , yAxisSize){

	let yhalfAxisSize = yAxisSize/2;

;
	let normY = (coordvec[1]/yAxisSize)-1;
	return normY;

}

// from the Common functions the professor provided 
export function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}