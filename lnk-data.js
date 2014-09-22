/*
LNK-DATA (lnk-data.js) - Javascript code for this CapLnk component.

Copyright (C) 2014 by Gregory J Lamoree

This file is part of the LNK-DATA component which is part of the
CapLnk (Component - Application - Link) suite of components. 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function() {
    var values = [];

    function setValue(attrName, attrValue, baseNode) {
        if(baseNode) {
            if(!values[baseNode]) {
                values[baseNode] = [];
            }
            var skippedNames = /(^id$|^name$|^media$|^target$|^data-|^elementisready$|^on-)/;
            if(!skippedNames.test(attrName)) {
                //if(attrName != "id" && attrName != "name" && attrName != "media" && attrName != "target" && attrName != "data-globals") {
                var attrParts = attrName.split(".");
                //console.log(attrName, JSON.stringify(attrParts));
                var leafPointer = values[baseNode];
                for (var i=0; i < attrParts.length; i++) {
                    //console.log(i, baseNode, attrParts[i], values);
                    if (i != attrParts.length - 1) {
                        if(!leafPointer[attrParts[i]]) {
                            leafPointer[attrParts[i]] = null;
                        }
                        leafPointer = leafPointer[attrParts[i]];
                    } else {
                        if(!attrValue) {
                            delete leafPointer[attrParts[i]];
                        } else {
                            leafPointer[attrParts[i]] = attrValue;
                        }
                    }
                }
                return leafPointer;
            }
        }
    }

    Polymer('lnk-data', {
        ready: function() {
            // Do nothing here... the attributes might not be filled in with a polyfill yet.
            //console.log(this.nodeName + ": ready.");
            
            // If this tag is used to get data rather than global variables...
            if(this.attributes.getNamedItem("data-source")) {
                this.theData = eval(this.attributes.getNamedItem("data-source").value);
            }
            

        },
        publish: {
            allValues: values
        },
        // This is here so polyfills will work.
        elementisreadyChanged: function(oldValue, newValue) {
            if(newValue == "true") {
                // Do Whatever needs to be done that would have been in "ready" if it worked during polyfills

                this.baseNode = this.attributes.getNamedItem("data-globals").value;
                //console.log("abk-globals.ready.baseNode", baseNode);

                for (var i = 0; i < this.attributes.length; ++i) {
                    setValue(this.attributes[i].nodeName, this.attributes[i].nodeValue, this.baseNode);
                }
                //this.allValues = values; // This should only be used to view the entries.
                this.myValues = values[this.baseNode];
                this._values = values;
                
                for (var i = 0; i < this.attributes.length; ++i) {
                    setValue(this.attributes[i].nodeName, this.attributes[i].nodeValue, this.baseNode);
                }
                this.allValues = values; // This should only be used to view the entries.
                this.myValues = values[this.baseNode];
                this._values = values;
                //console.log(this.nodeName + ": Really ready.");
                // Then fire an event to let every one know you are REALLY ready.
                this.fire('globalsready', {msg: 'I feel much better now.'});
            }
        },                
        refreshtoggleChanged: function(oldVal, newVal) {
            //setValue(attrName, newVal, this.templateInstance.model.nodeName || this.parentNode.nodeName);
            //console.log("abk-globals.attributeChanged(" + attrName + " = " + newVal + ").baseNode", baseNode);
            //setValue(attrName, newVal, this.baseNode);
            console.log("lnkData: Getting " + this.datasource);
            this.dataresponse = eval(this.datasource);
        }
    });
})();
