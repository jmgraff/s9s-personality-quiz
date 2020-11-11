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
    'email': { button: EmailShareButton, icon: EmailIcon },
    'facebook': { button: FacebookShareButton, icon: FacebookIcon },
    'facebookmessenger': { button: FacebookMessengerShareButton, icon: FacebookMessengerIcon },
    'hatena': { button: HatenaShareButton, icon: HatenaIcon },
    'instapaper': { button: InstapaperShareButton, icon: InstapaperIcon },
    'lineshare': { button: LineShareButton, icon: LineIcon },
    'linkedin': { button: LinkedinShareButton, icon: LinkedinIcon },
    'livejournal': { button: LivejournalShareButton, icon: LivejournalIcon },
    'mailru': { button: MailruShareButton, icon: MailruIcon },
    'ok': { button: OKShareButton, icon: OKIcon },
    'pinterest': { button: PinterestShareButton, icon: PinterestIcon },
    'pocket': { button: PocketShareButton, icon: PocketIcon },
    'reddit': { button: RedditShareButton, icon: RedditIcon },
    'telegram': { button: TelegramShareButton, icon: TelegramIcon },
    'tumblr': { button: TumblrShareButton, icon: TumblrIcon },
    'twitter': { button: TwitterShareButton, icon: TwitterIcon },
    'viber': { button: ViberShareButton, icon: ViberIcon },
    'vk': { button: VKShareButton, icon: VKIcon },
    'weibo': { button: WeiboShareButton, icon: WeiboIcon },
    'whatsapp': { button: WhatsappShareButton, icon: WhatsappIcon },
    'workplace': { button: WorkplaceShareButton, icon: WorkplaceIcon },
};

const ShareButton = ({id, atts}) => {
    const ShareButtonTag = share_classes[id].button;
    const ShareIconTag = share_classes[id].icon;
    return (
        <ShareButtonTag {...atts}>
            <ShareIconTag />
        </ShareButtonTag>
    );
}

export function Share({ids, atts}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em', flexWrap: 'flex', width: '100%' }}>
            { ids.map(id => <ShareButton id={id} atts={atts} />) }
        </div>
    );
}
