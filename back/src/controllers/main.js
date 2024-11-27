// import {
//   mainModel,
//   itemsModel,
//   versionModel,
//   teamModel,
//   statsModel,
//   projectModel,
//   ComponentModel
// } from '../models/index.js'
// import { formatDate } from '../helpers/index.js'

// export const decoupage = async (req, res) => {

//   try {
//     await teamModel.deleteMany()
//     await projectModel.deleteMany()
//     await statsModel.deleteMany()
//     await versionModel.deleteMany()
//     await projectModel.deleteMany()
//     await itemsModel.deleteMany()
//     await ComponentModel.deleteMany()

//     const result = await mainModel.find({})
//     let component = null
//     let tab = {}

//     for (const el of result) {
//       try {
//         let version = await versionModel.findOneAndUpdate(
//           { version: el.version },
//           { version: el.version },
//           { upsert: true, new: true },
//         )
//         let versionId = version._id

//         let project = await projectModel.findOneAndUpdate(
//           { name: el.project },
//           { name: el.project, _versionId: versionId },
//           { upsert: true, new: true },
//         )
//         const projectId = project._id

//         let team = await teamModel.findOneAndUpdate(
//           { name: el.team },
//           { name: el.team, _projectId: projectId },
//           { upsert: true, new: true },
//         )
//         const teamId = team._id;

//         for (const [key, value] of Object.entries(el.stats)) {
//           component = new ComponentModel({
//             name: key,
//             count: value.count,
//             props: JSON.stringify(value.props),
//             children: JSON.stringify(value.children),
//             _versionId: versionId,
//             _projectId: projectId,
//             date: formatDate(el.date),
//           })

//           tab = {
//             ...tab,
//             [key]: {
//               name: key,
//               count: value.count,
//               props: JSON.stringify(value.props),
//               children: JSON.stringify(value.children),
//               _versionId: versionId,
//               _projectId: projectId,
//               date: formatDate(el.date),
//             }
//           }
//           await component.save()
//         }

//         let stats = new statsModel({
//           _versionId: versionId,
//           stats: tab,
//         })
//         const statsId = stats._id
//         await stats.save()

//         let items = new itemsModel({
//           _versionId: versionId,
//           _projectId: projectId,
//           _statsId: statsId,
//           date: formatDate(el.date),
//         })
//         await items.save();

//       } catch (e) {
//         res.status(500).json({ message: e.message })
//         console.error(`Une erreur s'est produite  ${e.message}`)
//       }
//     }
//     res.status(200).json({ message: 'ok' })
//   } catch (e) {
//     res.status(500).json({ message: e.message })
//   }
// }

export const postProject = async (req, res) => {
    res.json(req.file)
    console.log(req.file)
    /*try {
    const fileData = await fs.readFile(req.file.path, 'utf8')
    const jsonData = JSON.parse(fileData)
    const newJsonData = new mainModel(jsonData)
    await newJsonData.save()
    res.status(201).send('JSON data has been saved successfully!')
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal server error' })
  }*/
}
