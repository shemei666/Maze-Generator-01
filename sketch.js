let cols;
let rows;
let size = 10;

let stack = [];
let maze;
let ct = { x: 0, y: 0 };

function setup() {
    createCanvas(600, 600);
    cols = width / size;
    rows = height / size;

    maze = make2DMaze(cols,rows);
    maze[ct.y][ct.x].visit();

}

function draw() {
    background(255);
    if(ifUnvisitedCellExist())
    {
        let neighbours = unvistedNeighbours();
        if(neighbours.length > 0)
        {
            let chosen = random(neighbours);
            stack.push(ct);
            
            if (chosen.x === ct.x + 1)
            {
                // right
                maze[ct.y][ct.x].removeWall("right");
                maze[chosen.y][chosen.x].removeWall("left"); 
            }else if (chosen.x === ct.x - 1)
            {
                //left
                maze[ct.y][ct.x].removeWall("left");
                maze[chosen.y][chosen.x].removeWall("right"); 
            }if(chosen.y === ct.y + 1)
            {
                // down
                maze[ct.y][ct.x].removeWall("down");
                maze[chosen.y][chosen.x].removeWall("up"); 
            }else if (chosen.y === ct.y - 1)
            {
                // up
                maze[ct.y][ct.x].removeWall("up");
                maze[chosen.y][chosen.x].removeWall("down"); 
            }
            
            ct = {x:chosen.x , y:chosen.y};
            maze[ct.y][ct.x].visit();
        }else if(stack.length > 0)
        {
            ct = stack.pop();
        }
    }else
    {
        noLoop();
        console.log("DONE!");
    }
    noStroke();
    fill(255,0,255);
    ellipse(ct.x*size,ct.y*size,size,size);
    for (let i=0;i<maze.length;i++)
    {
        for(let j=0;j<maze[i].length;j++)
        {
            maze[i][j].show();
        }
    }

}


function ifUnvisitedCellExist()
{
    for (let i=0;i<maze.length;i++)
    {
        for(let j=0;j<maze[i].length;j++)
        {
            if(maze[i][j].visited === false)
            {
                return true;
            }
        }
    }
    return false;
}


function unvistedNeighbours()
{
    let cx = ct.x;
    let cy = ct.y;

    let temp = [];
    let ret = [];

    if (cx === 0)
    {
        let neighbour1 = {x:cx+1,y:cy};
        temp.push(neighbour1);
    }else if ( cx === cols-1)
    {
        let neighbour1 = { x: cx - 1, y: cy };
        temp.push(neighbour1);   
    }else
    {
        let neighbour1 = { x: cx + 1, y: cy };
        let neighbour2 = { x: cx - 1, y: cy };
        temp.push(neighbour1);
        temp.push(neighbour2);  
    }

    if (cy === 0) {
        let neighbour1 = { x: cx, y: cy+1 };
        temp.push(neighbour1);
    } else if (cy === rows-1) {
        let neighbour1 = { x: cx, y: cy - 1 };
        temp.push(neighbour1);
    } else {
        let neighbour1 = { x: cx, y: cy + 1 };
        let neighbour2 = { x: cx, y: cy - 1 };
        temp.push(neighbour1);
        temp.push(neighbour2);
    }

    for (let i=0;i<temp.length;i++)
    {
        //console.log(temp[i]);
        if (!maze[temp[i].y][temp[i].x].visited)
        {
            ret.push(temp[i]);
        }
    }

    return ret;
}








function make2DMaze(w, h) {
    let arr = new Array(h);
    for (let i=0;i<arr.length;i++)
    {
        arr[i] = new Array(w);
        for (let j=0;j<arr[i].length;j++)
        {
            arr[i][j] = new Cell(j,i,size);
        }
    }
    return arr;
}