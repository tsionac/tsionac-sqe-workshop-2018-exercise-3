import $ from 'jquery';
//import * as esprima from 'esprima';
import {parseCode} from './code-analyzer';
import * as d3 from 'd3-graphviz';

//const flowchart = require('flowchart.js');



$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let input = $('#vectorInput').val();
        let parsedCode= parseCode(codeToParse,input);
        d3.graphviz('#graphAppearance').renderDot('digraph { ' + parsedCode + ' }');
    });
});


