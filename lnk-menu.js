/*
LNK-MENU (lnk-menu.js) - Javascript code for this CapLnk component.

Copyright (C) 2014 by Gregory J Lamoree

This file is part of the LNK-MENU component which is part of the
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
        Element.prototype.hasClass = Element.prototype.hasClass || function(selector) {
            var className = " " + selector + " ";
            if ((" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
                return true;
            }

            return false;
        };
        
        Polymer('lnk-menu', {
            menuitems: {},
            orientation: "vertical", // Default value
            heading: "Menu Title", // Default value
            align: "left",
            publish: {
                isopen: {
                    value: false,
                    reflect: true
                }
            },
            orientationChanged: function(oldValue, newValue) {
                if(newValue == "horizontal"){
                    this.setAttribute("align","center");
                }
            },
            menuitemsChanged : function() {
                console.log("Changed: " + this.items);
            },
            ready: function() {
               //this.itemsObject = tmpData[this.items];
                console.log("Hello:" + this.items, this.orientation);
               //this.$.lnkData.refreshtoggle = !this.$.lnkData.refreshtoggle;
                
            },
            clientWidthChanged: function(oldValue, newValue) {
            },
            menuOpenClose: function(event, detail, sender) {
                if (event.stopPropagation) event.stopPropagation();
                if (event.cancelBubble!=null) event.cancelBubble = true;
                var target = event.target;
                if(target.hasClass("menuHeading")) {
                    target = this;
                }
                if(target.hasAttribute("isopen")) {
                    target.removeAttribute("isopen");
                } else {
                    target.setAttributeNode(document.createAttribute("isopen"));
                }
                var siblings = target.parentNode.getElementsByClassName("menuItem");
                if(target.nodeName == "LNK-MENU" || !(target.parentNode.hasClass("menuContainer") || target.parentNode.hasClass("menuSubItem"))) {
                    siblings = event.target.nextElementSibling.getElementsByClassName("menuItem");
                }
                for(var sibling = 0; sibling < siblings.length; ++sibling) {
                    
                    var theSibling = siblings[sibling];
                    if((theSibling !== event.target)) {
                        theSibling.removeAttribute("isopen");
                    }
                }
            }
        });
