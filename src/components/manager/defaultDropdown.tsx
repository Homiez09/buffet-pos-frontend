"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BaseTableResponse } from "@/interfaces/table"
import { useEffect, useState } from "react"
 
interface DefaultDropdownProps {
    list: string[],
    selectedTable: BaseTableResponse | null
}

export function DefaultDropdown({ list, selectedTable }: DefaultDropdownProps) {
  const [position, setPosition] = useState(list[0])

  useEffect(() => {
    if (selectedTable) {
      setPosition(selectedTable.tableName)
    }
  }, [selectedTable])
 
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
        <Button variant="outline">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tables Name</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {
            list.map((item, index) => <DropdownMenuRadioItem key={index} value={item}>{item}</DropdownMenuRadioItem>)
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}