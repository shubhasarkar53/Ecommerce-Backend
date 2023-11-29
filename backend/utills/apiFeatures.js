

class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

//   Feature 1 => Search Product:

    //creating variable to store the query string's name/keyword that is basically the searched keyword
    // if it is present =>
        // Then create an objecct called "name" and with the help of $regex and $options we careated a case insesative search keyword
    // else return empty obj

    // Now using this.query = this.query.find() we searched the item/product
            // .find()--takes an objecct so we passed the copy of the name object by using spread operator -{...name};

    // Finally the function should return something so it will return "this".

  search() {
    const name = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({...name});
    return this;
  }


//    Feature 2 => Filter Product:

    // Create a copy of quryString so that the main query string should not affact
    // store it in a variable here - queryStrCopy
    // Now create an array of keys which we want to remove from the query string whenever we filter through category ---("name","page","limit")
    // now loop the array of removable items and delete each element of queryStrCopy if it matches with the items of removable items array's element.
    // Then this.qury = this.qury.find()--to filter the products-
            // .find() - -takes a object so we send the queryStrCopy obj

    // Finally return this from the function


  filter(){
    const queryStrCopy = {...this.queryStr};
    
    const removeFields = ["name","page","limit"];
    // Remove fields
    removeFields.forEach((element)=>delete queryStrCopy[element]);


    // console.log(queryStrCopy);
    // this.query = this.query.find(queryStrCopy);



    // Filter for price
    let queryStr = JSON.stringify(queryStrCopy);
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }


  // Pagination

  pagination(resultsPerPage){

    const currentPage = this.query.page || 1;
    const skip = (currentPage-1)*resultsPerPage;

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeature;
