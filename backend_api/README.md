# api-50

## Package.json

### Standard

    MVC Pattern

## Request Response Cycle

    - Client create ---> Request
        -method, url
    -Server sending data to client --->Response

### Features defined(E-commerce)

    - **Pages/Front**
    - **Authorization and Authentications**

    - **Banners**
    - **Brands**
    - **Category**
    - **Users**
    - **Product**
    - **Order Details**
    - **Order**
    - **Transactions**

    - **FeedBack**
    - **Inventory**
    - **Offers**

### MVC (Model - View - Controller)

    - 3 - tier
    - Data - Presentaton(json) - Logic

### How code Flows

```
  Route -----> Middleware/Controller -----> Service/Model -----> Database Server
                  Response Sent
```

## Features

    ### Authentication and Authorization
        - Registration
        - Activation
        - Login
        - Forget password
        - Reset password
        - Your profile
        - Update My Profile / access the other features allowed
        - Logout

### Multer

    -  `uploader().none()` -> content-type => multipart/form-data but no file upload
    -  `uploader().single(fieldName)` -> content-type => multipart/form-data and `fieldName` has one file
    -  `uploader().array(fieldName, [config])` -> content-type => multipart/form-data and `fieldName` can have multiple files at a time
    -  `uploader().field([{name: fieldName, limit: }])`

### Query in Mongodb(Shell)

#### Create (**C**)

    - One row/documet at a time
        - `db.<collectionName>.insertOne(JSON)`
        - e.g. `db.users.insertOne({name: "", email: "", password: "", role: ""})`
            - return -> Acknowledgement({insertId: "", acknowldged: boolean})
            - add _id to out data => type ObjectId instance (alpha numeric hex)

    - Multiple rows/document at a time
        - `db.<collectionName>.insertMany([Objects])`
        - e.g. `db.users.insertMany([{name: "", email: "", password: "", role: ""}, {name: "", email: "", password: "", role: ""}])`
            -return -> Acknowledgement ({inserId: {'0': ObjectId(hex), '1' : ObjectId(hex)}, acknowledged: boolean})

#### Read (**R**)

    - `db.<collectionName>.find(filter, projection, options)`
        - filter type => json where
    - `db.<collectionName>.findOne(filter, projection, options)`
    - ```
        Projection ~ SELECT ....
    ```

    - ```json
         {
            key : "value"
         }

         {
            key1 : "value1",
            key2 : "value2"
         }

         {
            $op : "expression"
         }

         {
            key: {$op: "expression"}
         }

         {
            age: {$lt : 18}
         }

         {
            $and : [
                {role: "admin"},
                {address: ($in : [])}
            ]
         }
         // (role: "admin") and (address: "kathmandu")

         $lt, $gt, $lte, $gte, $eq, $ne, $in, @nin, $and, $or, $regex
    ```

#### Update (**U**)
    - `db.<collectionName>.updateOne(filter, {$set : JSON}, {upsert: 1,0})`
    - `db.<collecitonName>.updateMany(filter, {$set: JSON}, {upsert: 1,0})`

#### Delete (**D**)
    - `db.<collectionName>.deleteOne(filter)`
    - `db.<collecitonName>.deleteMany(filter)`

#### Aggregation Pipeline
    - staged query
        - pipeline
        [
            {pipeline}
        ]


### Sql Db use
    - host, user, password, dbName,
        -ORM
    - Create DB
        - migration (files given by ORM ---> Schema) ---> Table prepare in our db
    - Project Connect

### Auth
    -

### Brands
    - name, slug, logo, (_id, status, createdBy, updatedBy, createdAt, updatedAt)

### Category
    - name, slug, parentId ,image, brands, (_id, status, createdBy, updatedBy, createdAt, updatedAt)

### Products
    - name, slug, description, price, discount(%), afterDiscount, seller, featured, category, brand, images, (_id, status, createdBy, updatedBy, createdAt, updatedAt)

### Orders
    - code, buyer, subtotal, tax, total, status, (_id, status, createdBy, updatedBy, createdAt, updatedAt)
    #### Order Details
        - order, buyer, product, price, quantity, subtotal, tax, total, status,(_id, createdBy, updatedBy, createdAt, updatedAt) 