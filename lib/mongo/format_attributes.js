
module.exports = (attributes) => {


    var attrs = '';

    for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i].split(':');
        if(typeof attr[1] == 'undefined'){
           attr[1] ='string'
        }
        if(typeof attr[1]!='undefined' && attr[1]=='required'){
            attr[2] = attr[1]
            attr[1] ='string' 
        }
        var type = attr[1].charAt(0).toUpperCase() + attr[1].slice(1);
        var required = attr[2] == 'required' ? true : false;
        attrs += `\t${attr[0]}: { type: ${type}, required: ${required} }`;
        if (i+1 != attributes.length)
            attrs += ',\n';
    }
    
    return attrs;

}