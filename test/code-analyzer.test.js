import assert from 'assert';
import {parseCode,structEdge} from '../src/js/code-analyzer';


describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}','1,2,3'),'n1 [label="-1-\n' +
            'let a = x + 1;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'let b = a + y;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'let c = 0;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n4 [label="-4-\n' +
            'b < z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n5 [label="-5-\n' +
            'c = c + 5" ,shape = "box"]\n' +
            'n6 [label="-6-\n' +
            'return c;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n7 [label="-7-\n' +
            'b < z * 2" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n8 [label="-8-\n' +
            'c = c + x + 5" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n9 [label="-9-\n' +
            'c = c + z + 5" ,shape = "box"]\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 []\n' +
            'n4 -> n5 [label="true"]\n' +
            'n4 -> n7 [label="false"]\n' +
            'n5 -> n6 []\n' +
            'n7 -> n8 [label="true"]\n' +
            'n7 -> n9 [label="false"]\n' +
            'n8 -> n6 []\n' +
            'n9 -> n6 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x){\n' +
            'while(x<5){\n' +
            'x=x+1\n' +
            '}\n' +
            '\n' +
            'return x}','1'),'n1 [label="-1-\n' +
            'x<5" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'x=x+1" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'return x" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n3 [label="false"]\n' +
            'n2 -> n1 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x, y, z){\n' +
            'while(x>z){\n' +
            'z=z+1\n' +
            '}\n' +
            'if(x>y){\n' +
            'if(y>z){\n' +
            'return z}\n' +
            'return y}\n' +
            'return x}','3,2,1'),'n1 [label="-1-\n' +
            'x>z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'z=z+1" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'x>y" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n4 [label="-4-\n' +
            'y>z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n5 [label="-5-\n' +
            'return z" ,shape = "box"]\n' +
            'n6 [label="-6-\n' +
            'return y" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n7 [label="-7-\n' +
            'return x" ,shape = "box"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n3 [label="false"]\n' +
            'n2 -> n1 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n7 [label="false"]\n' +
            'n4 -> n5 [label="true"]\n' +
            'n4 -> n6 [label="false"]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x,y){\n' +
            ' \n' +
            ' while (x < 5) {\n' +
            '       x = x + 1;\n' +
            'if(x > y){\n' +
            'y=y+1;\n' +
            '      \n' +
            '   }\n' +
            '}\n' +
            '   \n' +
            '   return x;\n' +
            '}',''),'n1 [label="-1-\n' +
            'x < 5" ,shape = "diamond"]\n' +
            'n2 [label="-2-\n' +
            'x = x + 1" ,shape = "box"]\n' +
            'n3 [label="-3-\n' +
            'x > y" ,shape = "diamond"]\n' +
            'n4 [label="-4-\n' +
            'y=y+1" ,shape = "box"]\n' +
            'n5 [label="-5-\n' +
            'return x;" ,shape = "box"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n5 [label="false"]\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 [label="true"]\n' +
            'n3 -> n1 [label="false"]\n' +
            'n4 -> n1 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','1,2,2'),'n1 [label="-1-\n' +
            'let a = x + 1;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'let b = a + y;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'let c = 0;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n4 [label="-4-\n' +
            'b < z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n5 [label="-5-\n' +
            'c = c + 5" ,shape = "box"]\n' +
            'n6 [label="-6-\n' +
            'return c;" ,shape = "box"]\n' +
            'n7 [label="-7-\n' +
            'b < z * 2" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n8 [label="-8-\n' +
            'c = c + x + 5" ,shape = "box"]\n' +
            'n9 [label="-9-\n' +
            'c = c + z + 5" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 []\n' +
            'n4 -> n5 [label="true"]\n' +
            'n4 -> n7 [label="false"]\n' +
            'n5 -> n6 []\n' +
            'n7 -> n8 [label="true"]\n' +
            'n7 -> n9 [label="false"]\n' +
            'n8 -> n6 []\n' +
            'n9 -> n6 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','0,2,4'),'n1 [label="-1-\n' +
            'let a = x + 1;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'let b = a + y;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'let c = 0;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n4 [label="-4-\n' +
            'b < z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n5 [label="-5-\n' +
            'c = c + 5" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n6 [label="-6-\n' +
            'return c;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n7 [label="-7-\n' +
            'b < z * 2" ,shape = "diamond"]\n' +
            'n8 [label="-8-\n' +
            'c = c + x + 5" ,shape = "box"]\n' +
            'n9 [label="-9-\n' +
            'c = c + z + 5" ,shape = "box"]\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 []\n' +
            'n4 -> n5 [label="true"]\n' +
            'n4 -> n7 [label="false"]\n' +
            'n5 -> n6 []\n' +
            'n7 -> n8 [label="true"]\n' +
            'n7 -> n9 [label="false"]\n' +
            'n8 -> n6 []\n' +
            'n9 -> n6 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x){\n' +
            '\n' +
            '   while(x<5){\n' +
            'x=x+1\n' +
            '            }\n' +
            'return 3\n' +
            '}','3'),'n1 [label="-1-\n' +
            'x<5" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'x=x+1" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'return 3" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n3 [label="false"]\n' +
            'n2 -> n1 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x){\n' +
            '\n' +
            '   while(x<5){\n' +
            'x=x+1\n' +
            '            }\n' +
            'return x\n' +
            '}','6'),'n1 [label="-1-\n' +
            'x<5" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'x=x+1" ,shape = "box"]\n' +
            'n3 [label="-3-\n' +
            'return x" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n3 [label="false"]\n' +
            'n2 -> n1 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x){\n' +
            '\n' +
            '   while(x<5){\n' +
            'x=x+1\n' +
            '            }\n' +
            'return x\n' +
            '}','3'),'n1 [label="-1-\n' +
            'x<5" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'x=x+1" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'return x" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 [label="true"]\n' +
            'n1 -> n3 [label="false"]\n' +
            'n2 -> n1 []'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n','4,2,1'),'n1 [label="-1-\n' +
            'let a = x + 1;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n2 [label="-2-\n' +
            'let b = a + y;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n3 [label="-3-\n' +
            'let c = 0;" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n4 [label="-4-\n' +
            'b < z" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n5 [label="-5-\n' +
            'c = c + 5" ,shape = "box"]\n' +
            'n6 [label="-6-\n' +
            'return c;" ,shape = "box"]\n' +
            'n7 [label="-7-\n' +
            'b < z * 2" ,shape = "diamond" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n8 [label="-8-\n' +
            'c = c + x + 5" ,shape = "box"]\n' +
            'n9 [label="-9-\n' +
            'c = c + z + 5" ,shape = "box" ,style=filled,fillcolor ="#66ffc2"]\n' +
            'n1 -> n2 []\n' +
            'n2 -> n3 []\n' +
            'n3 -> n4 []\n' +
            'n4 -> n5 [label="true"]\n' +
            'n4 -> n7 [label="false"]\n' +
            'n5 -> n6 []\n' +
            'n7 -> n8 [label="true"]\n' +
            'n7 -> n9 [label="false"]\n' +
            'n8 -> n6 []\n' +
            'n9 -> n6 []'
        );
    });
});





