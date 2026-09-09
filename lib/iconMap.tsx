import type { ComponentType, SVGProps } from "react";
import {
  IconConsulting,
  IconExcellence,
  IconQuality,
  IconIso,
  IconDigital,
  IconManagement,
  IconProduction,
  IconMaintenance,
  IconStores,
  IconHr,
  IconCrm,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export const pillarIcons: Record<string, Icon> = {
  consulting: IconConsulting,
  "business-excellence": IconExcellence,
  "quality-management": IconQuality,
  "iso-management": IconIso,
  "digital-solution": IconDigital,
};

export const moduleIcons: Record<string, Icon> = {
  Management: IconManagement,
  Production: IconProduction,
  Quality: IconQuality,
  ISO: IconIso,
  Maintenance: IconMaintenance,
  Stores: IconStores,
  HR: IconHr,
  "CRM & Sales": IconCrm,
};
