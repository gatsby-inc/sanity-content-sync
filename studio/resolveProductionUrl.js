const isDraft = id => id.includes('drafts');

export default function resolveProductionUrl(document) {
  
  if (document._type === 'post') {
    return "https://example.com"
  }
  //   let id = document._id;
    
  //   if (isDraft(id)) {
  //     id = document._id.split('drafts.')[1];

  //   return `https://preview-sanitycontentsyncmain.gtsb.io/?pageId=${id}${
  //     isDraft(document._id) ? '&isDraft=true' : ''
  //   }`;
  // }
  // return undefined;
}