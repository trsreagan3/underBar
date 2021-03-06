(function() {
  'use strict';
//add a note for pull request
  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var someArr=[];
    var startIndex=array.length-n
    if (n==undefined){return array.pop()}
    else if(n==1){return array.pop()}
    else if (n > array.length-1){return array}
    else if (n===0){return []}
    
    else {return array.slice(startIndex)}
   
  };
  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  //////////////////initial each
  /*
  _.each = function(collection, iterator) {
    
    if(Array.isArray(collection)){
      console.log('it is an array')
      for(var i=0;i<collection.length;i++){
        iterator(collection[i], i, collection)
        console.log([collection[i], i, collection])
      }   
    }

    if(collection.length==undefined){
    console.log('it is an object')
      for(var key in collection){
        iterator(collection[key], key, collection);
        // console.log([collection['key'],key ,collection]);
        }
    }
    
  }
  */
  ///////////////////end of initial each
  //////////////////begin refactored each
 _.each = function(collection, iterator) {
    if (collection.constructor === Array) {
      for (var i = 0; i < collection.length; i++) {
        var index = i;
        iterator(collection[i], index, collection);
      }
    }
    if (collection.constructor === Object) {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  }



  ///////////////////end refactored each
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
 _.filter = function(collection, test) {
    var tempArray=[];
    
      for(var i=0;i<collection.length; i++){
        if(test(collection[i]))
        tempArray.push(collection[i])
      }
      return tempArray;
    
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var tempArray=[];
    
      for(var i=0;i<collection.length; i++){
        if(test(collection[i])==false)
        tempArray.push(collection[i])
      }
      return tempArray;
    
  };
    

  // // Produce a duplicate-free version of the array.
  ///////////////////////////
  //  _.uniq = function (array){

  //   var tempArray=[];
  //   tempArray.push(array[0]);
  //   for (var i=1;i<array.length;i++){
  //     var counter=1;
  //     var itemChecking= array[i];
      
  //     for (var j=0;j<tempArray.length;j++){
         
  //        var checkAgainst=tempArray[j]
  //       if (tempArray[j]!=array[i] && counter==tempArray.length){
  //           tempArray.push(array[i])
  //         }
            
  //       else{
  //           //console.log ('here is the else loop and counter value:' + counter)
  //           ////the problem is here with the counter
  //           counter++
  //          }
  //       }
  //   }
  //   return tempArray;
  // }
/////////////////////////

_.uniq = function (array) {
    var seen = {};
    var out = [];
    var len = array.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = array[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
};
  






  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var someArray=[]

    for (var i =0; i<collection.length; i++){
      var item = collection[i];
      someArray.push(iterator(item))
    }
    return someArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, memo){
  var memoUndefined = arguments.length < 3;
  _.each(collection, function(elem, index, collection){
    if(memoUndefined) {
      memoUndefined = false;
      memo = elem;
    } else memo = iterator(memo, elem, index, collection);
  });
  return memo;
};


  

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // _.every = function(collection, iterator) {
  //   // TIP: Try re-using reduce() here.
  //   ////scenario for all true///
  //   var newArray=[];
  //   _.reduce(collection, function (item){
  //     if (iterator(item)!==false){
  //       newArray.push(item)
  //     }
  //   })
  //     if (newArray.length==collection.length){return true}
  //     else {return false}
        
  // };
//  _.every = function(collection, iterator) {
//       if (arguments.length==1){
//         var counter=0;
//         for (var i = 0; i<collection.length;i++)  {
//           if (collection[i]==false){
//             return false
//           } else if (collection[i]){
//             counter++
//           } if (counter==collection.length-1){
//               return true
//           }
//         }
        
//       }
//       else {
//     return _.reduce(collection, function(allFound, item) {
//         return !!iterator(item) && allFound;
//       }, true);
//     }
// }
 _.every = function(collection, iterator) { 

  if (iterator==undefined){
    return (!(_.contains(collection, false)))
  }
  
  else {
      return _.reduce(collection, function(allFound, item) {
         return !!iterator(item) && allFound;
       }, true);
  }

}

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  //_.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    ///////////////////////////attempt1
    // var newArray=[]
    // var allArrayTrue=false;
    // var allArrayFalse=false;

    // if (_.every(collection, true)==true){
    //       allArrayTrue=true;
    //     }
    
    // if (_.every(collection, false)==true){
    //       allArrayFalse=false;
    //     }

    // if (iterator===undefined){
    //   iterator = function (item, index,list){
    //     _.each(collection, function (){
    //       return (collection) 
    //     })
    //   }
    // } 
    //  if (iterator==undefined){

    //   iterator=  
    // else if(_.every(collection, false)){
    //       allArrayFalse=true;
    //     })
    //     }
    //     return (!(_.every(collection, false)))
    //   }

      
    //  if(iterator!==undefined) {
    //     _.each(collection, function (item){
    //         if (iterator(item)!=false){
    //           newArray.push(true)
    //         }
    //         else {newArray.push(false)}
    //     })
    //   }

    //   if (_.contains(newArray, true)){
    //         return true
    //   }
    //   else {return false}
    //   }

//////////////////////////////////////////////////end of attempt 1
/////////////////////////////
//////////////////////////////some attempt1
/*
_.some=function(collection, theTest, context) {
    theTest = cb(theTest, context);
    var keys = !isArrayLike(collection) && _.keys(collection),
        length = (keys || collection).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (theTest(collection[currentKey], currentKey, collection)) return true;
    }
    return false;
  };
*/
////////////////////////////////end some attempt1
  _.some= function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //create a default value for the iterator
    iterator = (iterator || _.identity)

    return !!_.reduce(collection, function(test, item) {
      return test || iterator(item);
    }, false);
  };
/////////////////////

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
_.extend = function(collection) {
    _.each(arguments, function(arg) {
      _.each(arg, function(value, key) {
        collection[key]=value;
      })
    })
    return collection;
  }

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
   _.defaults = function(collection) {
    _.each(arguments, function(arg) {
      _.each(arg, function(value, key) {
        if (collection[key]===undefined) {
          collection[key]=value;
        }
      })
    })
    return collection;
  };



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(x) {
    var holder = {};
      
      return function() {
      var arg = JSON.stringify(arguments);
      
      if (!holder[arg]) {
        holder[arg] = x.apply(this, arguments);
        }

        return holder[arg];
      }
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay= function(item, time) {
    
    var piece = Array.prototype.slice.call(arguments, 2);
    
    setTimeout(function() {
      item.apply(this, piece);
    }, time);
  
  }


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
 _.shuffle = function(array) {
    //var shuffled = [];
    var arrayCopy = Array.prototype.slice.call(array);

    var newArray = [];

    /////////////initial for loop begin
    // for (var i = 0; i < array.length; i++) {
    //   var random = Math.floor(Math.random() * arrayCopy.length);
    //   newArray.push(arrayCopy[random]);
    //   arrayCopy.splice(random,1);
    // }
    /////////////////////////initial for loop end
      for (var i = 0; i < array.length; i++) {
      
      var random = Math.floor(Math.random() * arrayCopy.length);
      
        newArray.push(arrayCopy[random]);
        arrayCopy.splice(random,1);
    }

    return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
