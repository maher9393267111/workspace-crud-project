import { nanoid } from "nanoid";
import nc from "next-connect";
import { db, onError } from "../../../config";
import Work from "../../../models/workspace";

// use error function if error occurs
const handler = nc({
  //onError,
});

// post request
handler.post(async (req, res) => {
  // connect to db
  await db.connect();

  // instantiate new Order
  const newWork = new Work({
    ...req.body,
  });
  // save to db
  const workdata = await newWork.save();
  res.status(201).send(workdata);
});

handler.get(async (req, res) => {
  await db.connect();


  if ( req.query.id !== undefined) {
    console.log('id is already' + req.query.id);
    const getWork = await Work.findById(req.query.id)
    await db.disconnect();
    res.send({data:getWork});
  }


  else {
  const categories = await Work.find();
  await db.disconnect();
  res.send({data:categories});
  }


});

handler.put(async (req, res) => {
  // connect to db
  await db.connect();

  //   find order details
  const work = await Work.findById(req.query.id);

  const {title,image ,users , description ,emaile } = req.body;

  console.log(req.query);
  //   if order exists
  if (work) {
    console.log("work found", req.body);
    //   change isPaid to true
  //  work.title = req.body.title;

    //work.users = [...req.body.users];
   // work.users.push(req.body.users);

    // save to db
//const updateWork = await Work.updateById(req.query.id, ...req.body)

//console.log('after update', updateWork);
   // const updateWork = await work.save();

 const updatedWork =   await Work.updateOne({_id:req.query.id}, {title,image ,users , description ,emaile })

    // disconnect db
    await db.disconnect();

    // send req
    res.send({ message: "work updated Successfully" , data: updatedWork});
  } else {
    // if order does'nt exist send 404 error
    await db.disconnect();
    res.status(404).send({ message: "work not found" });
  }
});

export default handler;
