const isDraft = id => id.includes('drafts');

export default function resolveProductionUrl(document) {
  if (document._type === 'post') {
    let id = document._id;
    
    if (isDraft(id)) {
      id = document._id.split('drafts.')[1];
    }

    const manifestId = `${id}-${document._updatedAt}`
    const contentSyncUrl = 'https://www.gatsbyjs.com/content-sync/d72799e6-1875-43e1-99b7-41eb87644f19'
   
   
    return `${contentSyncUrl}/gatsby-source-sanity/${manifestId}`
  }
  return undefined;
}