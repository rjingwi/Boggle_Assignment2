/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

// NAME: Ryan Jingwi, SID: @02975851

const TrieNode = function (key) {
  this.key = key;
  this.parent = null;
  this.children = {};
  this.end = false;

  this.getWord = function(){
    let output = [];
    let node = this;
    while (node !== null){
      output.unshift(node.key);
      node = node.parent;
    }
    return output.join('');
  };
}

const Trie = function(){
  this.root = new TrieNode(null);
  this.insert = function(word){
    let node = this.root;
    for(let i = 0; i < word.length; i++){
      if (!node.children[word[i]]){
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i == word.length-1){
        node.end = true;
      }
    }
  };

  this.contains = function(word){
    let node = this.root;
    for(let i = 0; i < word.length; i++){
      if (node.children[word[i]]){
        node = node.children[word[i]];
      }
      else {
        return false;
      }
    }
    return node.end;
  };

  this.find = function(prefix){
    let node = this.root;
    let output = [];
    for(let i = 0; i < prefix.length; i++){
      if (node.children[prefix[i]]){
        node = node.children[prefix[i]];
      }
      else {
        return output;
      }
    }
    findAllWords(node, output);
    return output;
  };

  const findAllWords = (node, arr) =>{
    if (node.end){
      arr.unshift(node.getWord());
    }
    for (let child in node.children){
      findAllWords(node.children[child], arr);
    }
  }

  this.remove = function (word){
    let root = this.root;
    if(!word) return;
    const removeWord = (node, word) =>{
      if (node.end && node.getWord() === word){
        let hasChildren = Object.keys(node.children).length > 0;
        if (hasChildren){
          node.end = false;
        }
        else{
          node.parent.children = {};
        }
        return true;
      }
      for (let key in node.children){
        removeWord(node.children[key], word);
      }
      return false;
    };
    removeWord(root,word);
  };
  
}

const check_valid_grid = function(grid){
  for(let i=0;i<grid.length;i++){
    if (grid[i].length != grid.length){
      return false;
    }

    if(grid[i].length == 0){
      return false;
    }

    for(let i2=0;i2<grid[i].length;i2++){
      if((grid[i][i2] == "Q") || (grid[i][i2] == "S")){
        return false;
      }
      if(!/^[a-zA-Z]+$/.test(grid[i][i2])){
        return false
      }
    }
  }
  return true;
}

let recursed = 0;
let attempt_string = "";
let traveled_coordinates = [];

const search_neighbors = function(grid,wordTrie,x,y,solutions){

  if (recursed == 0){
    attempt_string = grid[y][x];
    traveled_coordinates = [[x,y].toString()];
  }
  
  let qu_or_st = false;
  

  if((x != (grid[y].length-1) && (!traveled_coordinates.includes([x+1,y].toString())))){
    if((grid[y][x+1] == "QU") || grid[y][x+1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y][x+1];
    traveled_coordinates.push([x+1,y].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x+1),y,solutions);
      recursed -= 1;

    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != (grid.length-1)) && (!traveled_coordinates.includes([x,y+1].toString()))){
    if((grid[y+1][x] == "QU") || grid[y+1][x] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y+1][x];
    traveled_coordinates.push([x,y+1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,x,(y+1),solutions);
      recursed -= 1;

    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((x != 0) && (!traveled_coordinates.includes([x-1,y].toString()))){
    if((grid[y][x-1] == "QU") || grid[y][x-1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y][x-1];
    traveled_coordinates.push([x-1,y].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x-1),y,solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != 0) && (!traveled_coordinates.includes([x,y-1].toString()))){
    if((grid[y-1][x] == "QU") || grid[y-1][x] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y-1][x];
    traveled_coordinates.push([x,y-1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,x,(y-1),solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != 0) && (x != (grid[y].length-1)) && (!traveled_coordinates.includes([x+1,y-1].toString()))){
    if((grid[y-1][x+1] == "QU") || grid[y-1][x+1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y-1][x+1];
    traveled_coordinates.push([x+1,y-1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x+1),(y-1),solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != 0) && (x != 0) && (!traveled_coordinates.includes([x-1,y-1].toString()))){
    if((grid[y-1][x-1] == "QU") || grid[y-1][x-1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y-1][x-1];
    traveled_coordinates.push([x-1,y-1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x-1),(y-1),solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != (grid.length-1)) && (x != (grid[y].length-1)) && (!traveled_coordinates.includes([x+1,y+1].toString()))){
    if((grid[y+1][x+1] == "QU") || grid[y+1][x+1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y+1][x+1];
    traveled_coordinates.push([x+1,y+1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x+1),(y+1),solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }


  if((y != (grid.length-1)) && (x != 0) && (!traveled_coordinates.includes([x-1,y+1].toString()))){
    if((grid[y+1][x-1] == "QU") || grid[y+1][x-1] == "ST"){
      qu_or_st = true;
    }
    attempt_string += grid[y+1][x-1];
    traveled_coordinates.push([x-1,y+1].toString());
    if (wordTrie.find(attempt_string).length != 0){
      if ((wordTrie.contains(attempt_string)) && (attempt_string.length >= 3) && (!solutions.includes(attempt_string))){
        solutions.push(attempt_string);
      }
      recursed++;
      search_neighbors(grid,wordTrie,(x-1),(y+1),solutions);
      recursed -= 1;
    }
    if(qu_or_st){
      attempt_string = attempt_string.slice(0,-2);
      traveled_coordinates.pop();
    }
    else{
      attempt_string = attempt_string.slice(0,-1);
      traveled_coordinates.pop();
    }
    qu_or_st = false;
  }

}

exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  const wordTrie = new Trie();
  for(let i=0;i<dictionary.length;i++){
    wordTrie.insert(dictionary[i].toUpperCase());
  }

  for(let i=0;i<grid.length;i++){
    for(let i2=0;i2<grid[i].length;i2++){
      grid[i][i2] = grid[i][i2].toUpperCase();
    }
  }

  if (check_valid_grid(grid) == false){
    return solutions;
  }

  for(let y=0;y<grid.length;y++){
    for(let x=0;x<grid[y].length;x++){
      search_neighbors(grid,wordTrie,x,y,solutions);
    }
  }
  return solutions;
}

