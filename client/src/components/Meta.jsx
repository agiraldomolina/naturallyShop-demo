import {Helmet} from 'react-helmet-async'

export default function Meta({title, description, keywords}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Naturally Shop',
    description: 'Naturally Shop is a website that allows you to buy and sell natural goods.',
    keywords: 'natural, goods, shop, buy, sell'
}
