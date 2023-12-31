// TODO Find anoterh way to do this instead of a global var
var  canvas = document.getElementById('glcanvas');

var gl = canvas.getContext('webgl2');

if (!gl) {
    console.log('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
    alert('Your browser does not support WebGL');
}
//

window.gl = gl
window.canvas = canvas;


// Desc  creates and bind , unbind a vertex buffer 

export class VertexBuffer {
    constructor(data , usage , size){

        this.data = new Float32Array(data); 
        this.usage = usage;
        this.size = size; 
        this.bufferID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferID);
        console.log(this.bufferID);
        if(this.usage === 1) {gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);}// static draw
        if(this.usage === 2) {gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);}// Dynamic draw
    }

    bindBuffer(){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferID);
    }
    updateData(newdata){
        this.data = new Float32Array(newdata);
         gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferID);
        if(this.usage === 1) {gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);}// static draw
        if(this.usage === 2) {gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);}// Dynamic draw
    }

    unbindBuffer(){
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


    }
    }


// Desc  creates and bind , unbind a index buffer 

export class IndexBuffer {
    constructor(data , usage){

        this.data = new Uint16Array(data); 
        this.usage = usage;
        this.bufferID = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferID);
        console.log(this.bufferID);
        if(this.usage === 1) {gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.data , gl.STATIC_DRAW);}// static draw
        if(this.usage === 2) {gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.data, gl.DYNAMIC_DRAW);}// Dynamic draw
    }

    bindBuffer(){
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferID);
    }
    updateData(newdata){
        this.data = new Uint16Array( newdatadata); ;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferID);
        if(this.usage === 1) {gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.data, gl.STATIC_DRAW);}// static draw
        if(this.usage === 2) {gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);}// Dynamic draw
    }
    }



export class VertexAtr{
    constructor(type , count , normlized ){
        this.type = type; 
        this.count = count; 
        this.normlized = normlized
    }

    getType(){
        return this.type;
    }
    getCount(){
        return this.count; 
    }
    getNormlized(){
        return this.normlized;
    }

    getTypeSize(){
        return 4; // For now it only works with float type // TO DO improve that 
    }
}

// Desc keeps track of the layout of each vertex attribute in the buffer 

export class bufferLayout{
    constructor(){
        this.vertexAtrArray = []; 
    }

    pushAtr(vertexatr){
        this.vertexAtrArray.push(vertexatr);
       // Is that gonna even work TODO chekc this part 
    }
}

// bind the buffer and the layouts together
export class VertexArray{
    constructor(vertexBuffer , bufferLayout){
       this.renderID = gl.createVertexArray();
       gl.bindVertexArray(this.renderID);
        this.vertexBuffer = vertexBuffer; 
        this.bufferLayout = bufferLayout;
    this.vertexBuffer.bindBuffer();
    let i = 0 ;
    let offset = 0
    this.bufferLayout.vertexAtrArray.forEach(atr => {
        gl.enableVertexAttribArray( i );
        gl.vertexAttribPointer(
            i, // Attribute location
           atr.count, // Number of elements per attribute
            atr.type, // Type of elements
            atr.normlized,
            vertexBuffer.size* Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
           offset // Offset from the beginning of a single vertex to this attribute
        );


       // console.log(atr.count);
        offset += atr.count * Float32Array.BYTES_PER_ELEMENT;
        //console.log(offset);
        i++;
    });
    }

    bindVertexArray(){
        gl.bindVertexArray(this.renderID);
    }

    unbindVertexArray(){
        gl.bindVertexArray(null);

    }
}

// Creates a vertex and fragment shader based on the inputed text 
export class Program{ 
    constructor(vertexShaderPath , fragmentShaderPath , type){
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderPath);
	gl.shaderSource(fragmentShader, fragmentShaderPath);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	 this.program = gl.createProgram();
	gl.attachShader(this.program, vertexShader);
	gl.attachShader(this.program, fragmentShader);
	gl.linkProgram(this.program);
	if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(this.program);
	if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
    gl.useProgram(this.program);

    }

    bindProgram(){
        gl.useProgram(this.program);

    }

    unbindProgram(){
        gl.useProgram(null);
    }

    setUniform3(unifromName , f1 , f2,f3){
        let loc  = gl.getUniformLocation(this.program, unifromName);
        gl.uniform3f(loc , f1,f2,f3);
    }

    setUniform2(unifromName , f1 , f2){
        let loc  = gl.getUniformLocation(this.program, unifromName);
        gl.uniform2f(loc , f1,f2);
    }

    setUniform1(unifromName , f1){
        let loc  = gl.getUniformLocation(this.program, unifromName);
        gl.uniform1f(loc , f1);
    }
}

// object that takes a buffer program and vertex array and is ready to render all the premitece shapes  

export class Renderer {
    constructor(vertexbuffer , vertexarray , program){
        this.vertexbuffer = vertexbuffer; 
        this.vertexarray = vertexarray; 
        this.program = program; 
    }

    drawTriangle(){
        this.program.bindProgram();
        this.vertexbuffer.bindBuffer();
        this.vertexarray.bindVertexArray();
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }


    drawPoint(count){
        this.program.bindProgram();
        this.vertexbuffer.bindBuffer();
        this.vertexarray.bindVertexArray();
        gl.drawArrays(gl.POINTS, 0, count);
    }

    drawRectangle(){
        this.program.bindProgram();
        let    indices = [
            2 ,1 ,0 ,  // first triangle
            1,2,3,   // second triangle
          ];
        this.vertexbuffer.bindBuffer();
        this.vertexarray.bindVertexArray();
        let indexbuffer = new IndexBuffer(indices , 1)
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }


    drawLine(count){
        this.program.bindProgram();
        this.vertexbuffer.bindBuffer();
        this.vertexarray.bindVertexArray();
        gl.drawArrays(gl.LINES_STRIP, 0, count);

    }

}

