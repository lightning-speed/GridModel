module.exports = class vectorDatabase{
  constructor(){
    this.objects = new Array();
  }
  add(object,vector){
    this.objects.push({
      object:object,
      vector:vector
    });
  }
  findNearestObject(){
    
  }
}

