import * as esprima from 'esprima';
const esgraph = require('esgraph');
export {parseCode,checkIfIncludes,structEdge};

let node =[];
let arg=[];
let edgesInit=[];
let typeOfLabelString;
let labelArr;
let nodeColor=[];
let map_node_string={};
let map_node_type={};


function getNextNode(booleanEval,edgesInit, nodeFirst) {
    let nextNodeEdge = edgesInit.filter(element=>element.includes(nodeFirst+' ->'));
    if(nextNodeEdge.length > 1){
        if(booleanEval==true){
            return nextNodeEdge[0];
        }else{return nextNodeEdge[1];}
    }
    else
        return nextNodeEdge[0];

}
function create_Map_typeLabel(){
    for(let i =0; i<labelArr.length; i++){
        let str_key_From = labelArr[i].substring(labelArr[i].indexOf('n'));
        let key = str_key_From.substring(0,2);
        let str_value_from= labelArr[i].substring(labelArr[i].indexOf('"')+1);
        let value = str_value_from.substring(0,str_value_from.indexOf('"'));
        map_node_type[key]= value;
    }
}

function create_Map(){
    for(let i =0; i<node.length; i++){
        let str_key_From = node[i].substring(node[i].indexOf('n'));
        let key = str_key_From.substring(0,2);
        let str_value_from= node[i].substring(node[i].indexOf('"')+1);
        let value = str_value_from.substring(0,str_value_from.indexOf('"'));
        map_node_string[key]= value;
    }
}
function add_number(){
    for(let j = 0; j<node.length;j++){

        let part_str = node[j].substring(node[j].indexOf('n'+j),node[j].indexOf('=')+1);
        node[j]= part_str +'"'+'-'+(j+1)+'-'+'\n'+node[j].substring(node[j].indexOf('"')+1);

    }
}
function checkIfIncludes(statementType,node,stringToEvaluate){
    if(statementType.includes(map_node_type[node]))
        stringToEvaluate = stringToEvaluate + map_node_string[node]+';';
    else stringToEvaluate = stringToEvaluate + map_node_string[node];
    return stringToEvaluate;

}

function pushNodeToColor(node, edgesInit,stringToEvaluate) {
    create_Map(); let booleanEval=false;
    const statementType = ['Identifier','Literal','UnaryExpression','LogicalExpression','BinaryExpression','ArrayExpression','MemberExpression','WhileStatement','AssignmentExpression'];
    let nodeFirst = node[0].split(' ')[0];
    stringToEvaluate= checkIfIncludes(statementType,nodeFirst,stringToEvaluate);
    nodeColor.push(nodeFirst);
    for(let i =0; i<node.length; i++){
        booleanEval = eval(stringToEvaluate);
        if(map_node_type[nodeFirst]=='ReturnStatement'){break;}
        let nextNodeFromEdge = getNextNode(booleanEval, edgesInit, nodeFirst);
        let strForNextNode = nextNodeFromEdge.substring(nextNodeFromEdge.indexOf('>') + 2);
        let next_node = strForNextNode.substring(0,2);
        i= next_node.substring(1)-1;
        if(map_node_type[next_node]!=='ReturnStatement') {
            stringToEvaluate=checkIfIncludes(statementType,next_node,stringToEvaluate);
        }
        nodeFirst = next_node; nodeColor.push(nodeFirst);
    }
}

function pushArgs(body,vector) {
    let stringToEvaluate;
    let input = vector.split(',');
    body.params.map((part) => arg.push(part.name));
    if (typeof input !== 'undefined' && input[0] !== '') {
        stringToEvaluate = arg.map((part , i) => 'let ' + part + ' = ' + input[i] + ';').join(' ');
        pushNodeToColor(node,edgesInit,stringToEvaluate);
    }
}
const parseCode = (codeToParse,input) => {
    arg=[];nodeColor=[];
    let pp = esprima.parseScript(codeToParse, {loc: true, range: true}, function (node) {
        node['valuetext'] = codeToParse.substring(node.range[0], node.range[1]);
    });
    const cfg = esgraph(pp.body[0].body);
    typeOfLabelString = esgraph.dot(cfg);
    labelTypeToArr(typeOfLabelString);
    create_Map_typeLabel();
    const dot = esgraph.dot(cfg, {counter: 0, source: codeToParse});
    node = dot.split('\n');
    node.splice(0,1);
    edgesInit = structEdge(node);
    edgesInit.splice(0,1);
    node.pop();
    pushArgs(pp.body[0],input);
    let finalString = mergeTheArrayToString(node, edgesInit);

    return finalString;
};


function structEdge(node) {
    const edges= node.filter(word => word.includes('->'));
    const newEdges = edges.filter(label=>{return !(label.includes('exception'));});
    node.splice(node.findIndex(e=>e.includes('->')));
    const edgesAfterDeleteLast= newEdges.filter(label=>{return !(label.includes('n'+node.length));});
    return edgesAfterDeleteLast;
}

function labelTypeToArr(typeOfLabelString){
    labelArr = typeOfLabelString.split('\n');
    labelArr.splice(0,1);
    labelArr.splice(labelArr.findIndex(e=>e.includes('->')));
    labelArr.pop();
}

function color_node(){
    for(let i =0; i<node.length; i++){
        let str = node[i].substring(node[i].indexOf('n'));
        let node_check = str.substring(0,2);
        let index_end = node[i].indexOf(']');
        let str_for_color=node[i].substring(0,index_end);
        if(nodeColor.includes(node_check)){

            node[i]=str_for_color+' ,style=filled,fillcolor ="#66ffc2"]';
        }

    }
}

function changeShape(nodes) {
    for(let i = 0; i<nodes.length; i++ ){
        let index = labelArr[i].indexOf('"')+1;
        let index2 = nodes[i].indexOf(']');
        let labelType = labelArr[i].substring(index,labelArr[i].lastIndexOf('"'));
        const statementType = ['Identifier','Literal','UnaryExpression','LogicalExpression','BinaryExpression','ArrayExpression','MemberExpression','ExpressionStatement'];
        nodes[i]= statementType.includes(labelType)
            ? nodes[i].substring(0,index2)+' ,shape = "diamond"' + nodes[i].substring(index2,nodes[i].length )
            : nodes[i].substring(0,index2)+' ,shape = "box"' + nodes[i].substring(index2,nodes[i].length);

    }
    return nodes;
}

function mergeTheArrayToString(node, edges){
    let changeShapeArr = changeShape(node);
    if(nodeColor.length>0){color_node();}
    add_number();
    let newDotArray = changeShapeArr.concat(edges);
    let stringDot = newDotArray.join('\n');
    return stringDot;
}


