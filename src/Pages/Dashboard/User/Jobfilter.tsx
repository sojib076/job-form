
import { useState } from "react"
import { Search, MapPin, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { JobParams } from "@/utils/types"


interface JobFiltersProps {
  onFilterChange: (filters: JobParams) => void
  loading: boolean
}

const Jobfilter = ({ onFilterChange, loading }: JobFiltersProps) => {
     const [filters, setFilters] = useState<JobParams>({
    companyName: "",
    location: "",
    contract: "",
  
  })

  const handleFilterChange = (key: keyof JobParams, value: string) => {

    
    const newFilters = { ...filters, [key]: value || undefined }
    setFilters(newFilters)
  }

  const handleSearch = () => {
    onFilterChange({ ...filters, page: 1 })
  }

  const handleClear = () => {
    const clearedFilters = { companyName: "", location: "", contract: "All types", createdAt: "" }
    setFilters(clearedFilters)
    onFilterChange({
        page: 1,
        
    })
  }

  const hasActiveFilters = filters.companyName || filters.location || filters.contract !== "All types"
    return (
        <div>
             <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={filters.companyName || ""}
                onChange={(e) => handleFilterChange("companyName", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={filters.location || ""}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contract Type</label>
            <Select
              value={filters.contract || "All types"}
              onValueChange={(value) => handleFilterChange("contract", value)}
            >
              <SelectTrigger>
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All types">All types</SelectItem>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button
             
              size="lg"
             
              

            onClick={handleSearch} disabled={loading} className="flex-1 bg-blue-400">
              {loading ? "Searching..." : "Search"}
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" size="icon" onClick={handleClear}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
        </div>
    );
};

export default Jobfilter;