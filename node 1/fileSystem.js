const fs = require('fs');
// 1. Create a new txt file using the same fs module method we have learned before
// fs.writeFileSync(file,data[,options])
fs.writeFileSync('nodes.txt' , "nodes text file has been created successfully")

// 2. Create a copy of the newly created txt file using a method from the fs module.
// fs.copyFileSync('source.txt', 'destination.txt');
fs.copyFileSync('nodes.txt', 'destination.txt');

// 3. Rename one of the files using a method from the fs module.
// fs.renameSync(oldPath, newPath)
fs.renameSync('destination.txt', 'nodes_new.txt')

//Get a list of all the file names of the current directory using a method from the fs module.
fs.readdir('./', (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    // List the files in the directory
    console.log('Files in the directory:');
    files.forEach(file => {
      console.log(file);
    });
})

// 5. Find out and implement another method for the fs module.
// Get information about the file or directory
fs.stat('./', (err, stats) => {
    if (err) {
      console.error('Error getting file/directory information:', err);
      return;
    }
  
    // Log information about the file or directory
    console.log('File/Directory Information:');
    console.log('Is a file:', stats.isFile());
    console.log('Is a directory:', stats.isDirectory());
    console.log('File size (in bytes):', stats.size);
    console.log('Last modified:', stats.mtime);
  });