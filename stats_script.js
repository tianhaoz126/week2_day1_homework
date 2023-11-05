// Connect to the database (if you are not using the default database)
conn = new Mongo();
db = conn.getDB("statsdb");

// Output a message indicating that the script has started running
print('Starting the database operations');

// Create a collection called uscensus, if it doesn't exist
db.createCollection("uscensus");
print('Collection uscensus created');

var stats =[
    {
        'city': 'San Juan', 
        'zip': '00926', 
        'state': 'PR', 
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona', 
        'zip': '11368', 
        'state': 'NY', 
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago', 
        'zip': '60629', 
        'state': 'IL', 
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso', 
        'zip': '79936', 
        'state': 'TX', 
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles', 
        'zip': '90011', 
        'state': 'CA', 
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk', 
        'zip': '90650', 
        'state': 'CA', 
        'income': '66453',
        'age': '35'
    }
]

// Insert the data into uscensus collection
db.uscensus.insertMany(stats);
print('Data inserted into uscensus collection');

var additionalStats = [
    {
      'city': 'Pacoima',
      'zip': '91331',
      'state': 'CA',
      'income': '60360',
      'age': '33'
    },
    {
      'city': 'Ketchikan',
      'zip': '99950',
      'state': 'AK',
      'income': '00000',
      'age': '00'
    }
  ];
  
  // Insert the additional data into uscensus collection
  db.uscensus.insertMany(additionalStats);
  print('Additional records added to uscensus collection');
  
  var coronaRecord = db.uscensus.findOne({ city: 'Corona', state: 'NY' });
  if (coronaRecord) {
    print('The ZIP code for Corona, NY is: ' + coronaRecord.zip);
  } else {
    print('No record found for Corona, NY.');
  }

  var caliCities = db.uscensus.find({ state: 'CA' }, { income: 1, city: 1, _id: 0 });

caliCities.forEach(function(city) {
    print('City: ' + city.city + ', Income: ' + city.income);
});

db.uscensus.updateMany(
    { state: 'AK' }, 
    { $set: { income: '38910', age: '46' } }
  );
var count = db.uscensus.countDocuments({ state: 'AK', income: '38910', age: '46' });
print(count + ' records in Alaska updated with new income and age.');

var sortedByState = db.uscensus.find().sort({ state: 1 });

print('Records sorted by state (ascending):');
sortedByState.forEach(function(doc) {
    print(JSON.stringify(doc));
});