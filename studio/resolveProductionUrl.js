const isDraft = id => id.includes('drafts');

export default function resolveProductionUrl(document) {
  if (document._type === 'post') {
    let id = document._id;
    
    if (isDraft(id)) {
      id = document._id.split('drafts.')[1];
    }

    console.log(id); 

    return `https://yourUrl.com/preview?pageId=${id}${
      isDraft(document._id) ? '&isDraft=true' : ''
    }`;
  }
  return undefined;
}