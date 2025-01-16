import { useState, useEffect } from "react"
import axiosInstance from "../api/axios"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

export default function NeedHelp() {
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const [chosenLocation, setChosenLocation] = useState('')
  const [chosenCategory, setChosenCategory] = useState('')
  const [resources, setResources] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, categoriesRes] = await Promise.all([
          axiosInstance.get('/resources/locations'),
          axiosInstance.get('/resources/need-help-categories')
        ])
        setLocations(locationsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
      }
    }

    fetchData()
  }, [])

  const getResources = async () => {
    const response = await axiosInstance.get(`/resources/need-help?category=${chosenCategory}&location=${chosenLocation}`)
    setResources(response.data.resources)
  }

  return (
    <>
      <Header title="LALA Now > I Need Help"/>
        <div className="p-4">
        <p className="text-muted-foreground mt-12 mb-4">
        This search draws from <a href="https://docs.google.com/spreadsheets/u/1/d/1KMk34XY5dsvVJjAoD2mQUVHYU_Ib6COz6jcGH5uJWDY/htmlview#" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">MALAN Resources table</a>
        </p>
        <div className="flex gap-4  mb-8">
          <Select value={chosenLocation} onValueChange={setChosenLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location, index) => (
                <SelectItem key={index} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chosenCategory} onValueChange={setChosenCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => {
            getResources()
          }}>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources?.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Results</CardTitle>
                <CardDescription>No resources found for this category and area.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            resources?.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{resource.providing}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}

