import type { AdvertisementData } from "@/lib/api";

type ShowAdsProps = {
    ad?: AdvertisementData | null;
};

function ShowAds({ ad }: ShowAdsProps) {
    const isRenderableAd = (
        value?: AdvertisementData | null
    ): value is AdvertisementData & { title: string; websiteUrl: string } =>
        !!value?.show && !!value.title && !!value.websiteUrl;

    if (!isRenderableAd(ad)) return null;

    return (
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <a
                href={ad.websiteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Sponsored: ${ad.title}`}
                className="group relative block"
            >
                {ad.imageUrl ? (
                    <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="h-24 w-full object-cover sm:h-28 md:h-32 group-hover:scale-[1.02] transition-transform"
                    />
                ) : (
                    <div className="flex h-24 w-full items-center justify-center bg-muted text-sm text-muted-foreground sm:h-28 md:h-32">
                        {ad.title}
                    </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sponsored</p>
                    <p className="text-sm font-semibold sm:text-base">{ad.title}</p>
                </div>
            </a>
        </div>
    );
}

export default ShowAds;