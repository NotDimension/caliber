import { useState, useEffect } from "react";

export interface DiscordInviteData {
  iconUrl: string | null;
  bannerUrl: string | null;
  name: string;
  description: string | null;
  online: number;
  total: number;
  guildId: string | null;
  loading: boolean;
  failed: boolean;
}

export function useDiscordInvite(inviteCode: string | undefined): DiscordInviteData {
  const [data, setData] = useState<DiscordInviteData>({
    iconUrl: null,
    bannerUrl: null,
    name: "",
    description: null,
    online: 0,
    total: 0,
    guildId: null,
    loading: true,
    failed: false,
  });

  useEffect(() => {
    if (!inviteCode) {
      setData((d) => ({ ...d, loading: false, failed: true }));
      return;
    }
    fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=false`)
      .then((res) => {
        if (!res.ok) throw new Error("not ok");
        return res.json();
      })
      .then((json) => {
        if (!json.guild) throw new Error("no guild");
        const g = json.guild;
        const id = g.id as string;
        const iconUrl = g.icon
          ? `https://cdn.discordapp.com/icons/${id}/${g.icon}.${g.icon.startsWith("a_") ? "gif" : "png"}?size=256`
          : null;
        let bannerUrl: string | null = null;
        if (g.banner)
          bannerUrl = `https://cdn.discordapp.com/banners/${id}/${g.banner}.${g.banner.startsWith("a_") ? "gif" : "png"}?size=1024`;
        else if (g.splash)
          bannerUrl = `https://cdn.discordapp.com/splashes/${id}/${g.splash}.png?size=1024`;
        setData({
          iconUrl,
          bannerUrl,
          name: g.name ?? "Unknown Server",
          description: g.description ?? null,
          online: json.approximate_presence_count ?? 0,
          total: json.approximate_member_count ?? 0,
          guildId: id,
          loading: false,
          failed: false,
        });
      })
      .catch(() => setData((d) => ({ ...d, loading: false, failed: true, name: "Unavailable" })));
  }, [inviteCode]);

  return data;
}