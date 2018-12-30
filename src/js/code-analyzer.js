import * as esprima from 'esprima';
import * as d3 from 'd3-graphviz';
const esgraph = require('esgraph');
export {parseCode};
let node =[];
let edgesInit=[];
let typeOfLabel=[];

const parseCode = (codeToParse) => {
    let pp = esprima.parseScript(codeToParse, {loc: true, range: true}, function (node) {
        node['valuetext'] = codeToParse.substring(node.range[0], node.range[1]);
    });
    const cfg = esgraph(pp.body[0].body);
    typeOfLabel=esgraph.dot(cfg);
    const dot = esgraph.dot(cfg, {counter: 0, source: codeToParse});
    //  d3.graphviz('#graphAppearance2').renderDot('digraph { ' + typeOfLabel + ' }');
    node = dot.split('\n');
    node.splice(0,1);
    edgesInit = structEdge(node);
    edgesInit.splice(0,1);
    node.pop();
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


function changeShape(nodes) {
    let labelArr = typeOfLabel.split('\n');
    labelArr.splice(0,1);
    for(let i = 0; i<nodes.length; i++ ){
        let index = labelArr[i].indexOf('"')+1;
        let index2 = nodes[i].indexOf(']');
        let labelType = labelArr[i].substring(index,labelArr[i].lastIndexOf('"'));
        const statementType = ['Identifier','Literal','UnaryExpression','LogicalExpression','BinaryExpression','ArrayExpression','MemberExpression'];
        nodes[i]= statementType.includes(labelType)
            ? nodes[i].substring(0,index2)+' ,shape = "diamond"' + nodes[i].substring(index2,nodes[i].length )
            : nodes[i].substring(0,index2)+' ,shape = "box"' + nodes[i].substring(index2,nodes[i].length);
    }
    return nodes;
}

function mergeTheArrayToString(node, edges){

    let changeShapeArr = changeShape(node);
    let newDotArray = changeShapeArr.concat(edges);
    let stringDot = newDotArray.join('\n');
    return stringDot;
}


