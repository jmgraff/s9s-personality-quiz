import {
    EmailShareButton, EmailIcon,
    FacebookMessengerShareButton, FacebookMessengerIcon,
    FacebookShareButton, FacebookIcon,
    HatenaShareButton, HatenaIcon,
    InstapaperShareButton, InstapaperIcon,
    LineShareButton, LineIcon,
    LinkedinShareButton, LinkedinIcon,
    LivejournalShareButton, LivejournalIcon,
    MailruShareButton, MailruIcon,
    OKShareButton, OKIcon,
    PinterestShareButton, PinterestIcon,
    PocketShareButton, PocketIcon,
    RedditShareButton, RedditIcon,
    TelegramShareButton, TelegramIcon,
    TumblrShareButton, TumblrIcon,
    TwitterShareButton, TwitterIcon,
    VKShareButton, VKIcon,
    ViberShareButton, ViberIcon,
    WeiboShareButton, WeiboIcon,
    WhatsappShareButton, WhatsappIcon,
    WorkplaceShareButton, WorkplaceIcon,
} from 'react-share';

export const share_classes = {
    'email': { name: 'Email', button: EmailShareButton, icon: EmailIcon },
    'facebook': { name: 'Facebook', button: FacebookShareButton, icon: FacebookIcon },
    'facebookmessenger': { name: 'Facebook Messenger', button: FacebookMessengerShareButton, icon: FacebookMessengerIcon },
    'hatena': { name: 'Hatena', button: HatenaShareButton, icon: HatenaIcon },
    'instapaper': { name: 'Instapaper', button: InstapaperShareButton, icon: InstapaperIcon },
    'line': { name: 'Line', button: LineShareButton, icon: LineIcon },
    'linkedin': { name: 'LinkedIn', button: LinkedinShareButton, icon: LinkedinIcon },
    'livejournal': { name: 'Live Journal', button: LivejournalShareButton, icon: LivejournalIcon },
    'mailru': { name: 'Mail.ru', button: MailruShareButton, icon: MailruIcon },
    'ok': { name: 'OK', button: OKShareButton, icon: OKIcon },
    'pinterest': { name: 'Pinterest', button: PinterestShareButton, icon: PinterestIcon },
    'pocket': { name: 'Pocket', button: PocketShareButton, icon: PocketIcon },
    'reddit': { name: 'Reddit', button: RedditShareButton, icon: RedditIcon },
    'telegram': { name: 'Telegram', button: TelegramShareButton, icon: TelegramIcon },
    'tumblr': { name: 'Tumblr', button: TumblrShareButton, icon: TumblrIcon },
    'twitter': { name: 'Twitter', button: TwitterShareButton, icon: TwitterIcon },
    'viber': { name: 'Viber', button: ViberShareButton, icon: ViberIcon },
    'vk': { name: 'VK', button: VKShareButton, icon: VKIcon },
    'weibo': { name: 'Weibo', button: WeiboShareButton, icon: WeiboIcon },
    'whatsapp': { name: 'WhatsApp', button: WhatsappShareButton, icon: WhatsappIcon },
    'workplace': { name: 'Workplace', button: WorkplaceShareButton, icon: WorkplaceIcon },
};

const ShareButton = ({id, atts, onShare}) => {
    const ShareButtonTag = share_classes[id].button;
    const ShareIconTag = share_classes[id].icon;
    return (
        <ShareButtonTag {...atts} beforeOnClick={() => onShare()}>
            <ShareIconTag />
        </ShareButtonTag>
    );
}

export function createHashtagList(str) {
    let list = undefined;
    if (str) {
        list = str.split(" ").map(ii => {
            while (ii.startsWith('#')) {
                ii = ii.substring(1);
            }
            return ii;
        });
    }
    return list;
}

export function Share({ids, atts, onShare}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em', flexWrap: 'flex', width: '100%' }}>
            { ids.map(id => <ShareButton id={id} atts={atts} onShare={onShare} />) }
        </div>
    );
}

