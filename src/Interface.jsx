import React,{useState,useEffect} from 'react'

const SIZE=15;


class LinkedListNode{
  constructor(val){
    this.value=val;
    this.next=null;
  }
}
class LinkedList{
  constructor(val){
    const node=new LinkedListNode(val);
    this.head=node;
    this.tail=node;
  }
} 

function checkBounds(cords){
  const {row,col}=cords;
  if(row<0 || col<0 || row>=SIZE || col>=SIZE)return true;
  return false;
}


function createMatrix(){
  let cnt=1;
  const Matrix=[];
  for(let i=0;i<SIZE;i++){
    const row=[];
    for(let j=0;j<SIZE;j++){
      row.push(cnt);
      cnt++;
    }
    Matrix.push(row);
  }
  return Matrix;
}
function nextHeadCordinates(direction,cords){
  if (direction === "ArrowUp") {
    return {
      row: cords.row - 1,
      col: cords.col,
    };
  }
  if (direction === "ArrowRight") {
    return {
      row: cords.row,
      col: cords.col + 1,
    };
  }
  if (direction === "ArrowDown") {
    return {
      row: cords.row + 1,
      col: cords.col,
    };
  }
  if (direction === "ArrowLeft") {
    return {
      row: cords.row,
      col: cords.col - 1,
    };
  }
}
const Interface = () => {

  const Matrix = createMatrix();
  const [snakeCells, setSnakeCells] = useState(new Set([Matrix[5][5]]));
  // const [cnt,setcnt]=useState(1);
  const [snake, setSnake] = useState(new LinkedList({row:5,col:5,val:Matrix[5][5]}));
  useEffect(() => {
    document.onkeydown= e => {
      movement(e);
    }
  },)
  function gameOver(){
    // console.log("IN gameover function")
    setSnake(new LinkedList({row:5,col:5,val:Matrix[5][5]}));
    // console.log("SNAKE");
    // console.log(snake.head.value);
    setSnakeCells(new Set([Matrix[5][5]]));
    // console.log(snakeCells);
  }
  function movement(event){
    console.log("EVENT")
    console.log(event.key==="ArrowRight");
    const currHead={
      row:snake.head.value.row,
      col:snake.head.value.col,
    };
    const nextHeadCord=nextHeadCordinates(event.key,currHead);
    console.log("checking bounds");
    if(checkBounds(nextHeadCord)){
      console.log("out of bounds");
      gameOver();
      return;
    }
    const nextHeadVal=Matrix[nextHeadCord.row][nextHeadCord.col];
    console.log("checking self-bite");
    if(snakeCells.has(nextHeadVal)){
      gameOver();
      return;
    }
    console.log("adding new node");
    const nextHead=new LinkedListNode({row:nextHeadCord.row,col:nextHeadCord.col,val:nextHeadVal});
    const currHeadNode=snake.head;
    snake.head=nextHead;
    currHeadNode.next=nextHead;
    console.log("added new node");
    console.log(nextHeadVal);
    //if not eaten food
    console.log("removing tail");
    const currTailVal=snake.tail.value.val;
    const nextTail=snake.tail.next;
    snake.tail=nextTail;
    const newsnakeCells=snakeCells;
    // let newcnt=cnt;
    newsnakeCells.delete(currTailVal);
    console.log(newsnakeCells);
    newsnakeCells.add(nextHeadVal);
    console.log(newsnakeCells);
    // newcnt++;
    // setcnt(newcnt);
    setSnakeCells(new Set(newsnakeCells));
    console.log("SNAKE");
    console.log(snakeCells);
    // console.log("CNT");
    // console.log(cnt);
  }
  

  

  return (
    <div style={{background:"rgb(61,61,59)",height:"100vh"}}>
      <div className='d-flex justify-content-center' >
      <div>
      {Matrix.map((row,rowID) => (
        <div key={rowID} className="row">{
        row.map((cell,cellID) =>(
          <div className='col-1 border border-white' style={{height:"35px",width:"35px",backgroundColor:`${snakeCells.has(cell)?"lime":"aqua"}`}} key={cellID}></div>
        ))
        }</div>
      ))}
      </div>
      </div>
      {/* {movement()} */}
    </div>
  )
}

export default Interface