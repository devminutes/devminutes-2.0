start
  = devminutes

devminutes
  = id:identifier name:name date:date 
    mp3:mp3 soundcloud:soundcloud 
    resources:resources 
    description:description 
    { return {
        id:id, name:name, date:date, 
        mp3:mp3, soundcloud:soundcloud,
        resources:resources, description:description
    };}
   
identifier  = "dm-id:" value:value { return parseInt(value); }
name        = "dm-name:" value:value { return value; }
date        = "dm-date:" value:value { return value; }
mp3         = "dm-mp3:" value:value { return value; }
soundcloud  = "dm-soundcloud:" value:value { return value; }
description = "dm-description:" _? nl text:.* 
                { return text.join(""); }
resources   = nl* "dm-resources:" _ nl res:resource+ 
                { return res; }
resource    = "dm-resource:" title:string nl links:link+ nl 
                { return { title:title, links:links }; }
link        = link:string nl 
                { var l = link.split("||"); 
                  return { text:l[0], href:l[1] }; } 
value       = _ value:string nl { return value; }
string      = chars:char+ { return chars.join(""); }
integer     = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
char        = [^\n]
nl          = '\n'
_           = " "*
