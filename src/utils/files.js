const getFile = async (fileName) => {
    let file = null;
    file = await fetch(`http://localhost:8000/api/v1/files/${fileName}`);
    return file;
}

export default getFile;
