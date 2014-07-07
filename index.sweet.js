
//sjs --output index.js index.sweet.js
//map takes func then list, maps a func to the list, so, filter should be similar, how about haskel
//[func |list, filters]
//_.map(func,_.filter(filter,list)]

let for = macro {

  rule {($val in $list){$block ...}} =>{
    _.each($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.each($list, function($val,$index){$block ...})
  }
  rule {} =>{}
  //aka if it doesn't work just ignore it
  //either add range or .. or something...
}
let map = macro {
  rule {($val in $list){$block ...}} =>{
    _.map($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.map($list, function($val,$index){$block ...})
  }
}
//I'll use from for the memo
//miscmemo should be safe enough
let reduce= macro{
  rule {($val in $list){$block ...}} =>{
    _.reduce(_.rest($list), function($miscmemo,$val){$block ...},_.first(list))
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.reduce(_.rest($list), function($miscmemo,$val,$index){$block ...},_.first(list))
  }
  rule {($val in $list from $memo){$block ...}} =>{
    _.reduce($list, function($miscmemo,$val){$block ...},$memo)
  }
  rule {($index $[:] $val in $list from $memo){$block ...}} =>{
    _.reduce($list, function($miscmemo,$val,$index){$block ...},$memo)
  }
}

let reduceRight= macro{
  rule {($val in $list){$block ...}} =>{
    _.reduceRight(_.rest($list), function($miscmemo,$val){$block ...},_.first(list))
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.reduceRight(_.rest($list), function($miscmemo,$val,$index){$block ...},_.first(list))
  }
  rule {($val in $list from $memo){$block ...}} =>{
    _.reduceRight($list, function($miscmemo,$val){$block ...},$memo)
  }
  rule {($index $[:] $val in $list from $memo){$block ...}} =>{
    _.reduceRight($list, function($miscmemo,$val,$index){$block ...},$memo)
  }
}

let find = macro {
  rule {($val in $list){$block ...}} =>{
    _.find($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.find($list, function($val,$index){$block ...})
  }
}
let filter = macro {
  rule {($val in $list){$block ...}} =>{
    _.filter($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.filter($list, function($val,$index){$block ...})
  }
}
let where = macro {
  rule {($list){$block ...}} =>{
    _.where($list, {$block ...})
  }
  //I hope this version for block works... I think it will
  //I can make it work better with ident:expr but for now I wont
}
let findWhere = macro {
  //weirder format but cool, is it a good idea?
  rule {($list) where {$block ...}} =>{
    _.findWhere($where, {$block ... })
  }
  //I hope this version for block works... I think it will
  //I can make it work better with ident:expr but for now I wont
}
let reject = macro {
  rule {($val in $list){$block ...}} =>{
    _.reject($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.reject($list, function($val,$index){$block ...})
  }
}

let some = macro {
  rule {($val in $list){$block ...}} =>{
    _.some($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.some($list, function($val,$index){$block ...})
  }
}
let every = macro {
  rule {($val in $list){$block ...}} =>{
    _.every($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.every($list, function($val,$index){$block ...})
  }
}
let max = macro {
  rule {($val in $list){$block ...}} =>{
    _.max($list, function($val){$block ...})
  }
  rule {($index $[:] $val in $list){$block ...}} =>{
    _.max($list, function($val,$index){$block ...})
  }
}
//I'm not sure if I want anything for contains, ??? maybe in or conaints
//invoke?
//pluck?
macro str$internal { //internal macro
  case {_ ( $x ... )} => {
      var pattern = #{$x ...};
      var tokenString = pattern[0].token.value.toString();
      var stringValue = makeValue(tokenString, #{$here});
      return withSyntax($val = [stringValue]) {
        return #{$val};
    }
  }
}
//I am not sure how well semicolons will work
var _= require("underscore");
console.log(every(i in [1,2,3,4,5]){
  console.log(i,j);
  return i>2;
});
